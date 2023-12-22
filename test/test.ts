import { PublicClientConfig, WalletClientConfig, http, zeroAddress } from 'viem';
import { mnemonicToAccount } from 'viem/accounts';
import { arbitrumGoerli, arbitrumSepolia } from 'viem/chains';
import { MNEMONIC_TESTNET } from '../env.js';
import { getContract } from '../extensions.js';
import { getPublicClientRs, getWalletClientRs } from '../index.js';
import { RedstoneHelper } from '../redstone/index.js';
import { demoDataServiceConfig, mockedConfig } from '../redstone/mocks.js';
import { Kresko } from '../utils/kresko.js';
const configs = {
	public: {
		chain: arbitrumGoerli,
		transport: http('https://arbitrum-goerli.public.blastapi.io'),
	} as PublicClientConfig,
	arbSepolia: {
		chain: arbitrumSepolia,
		transport: http('https://arbitrum-sepolia.public.blastapi.io'),
	} as PublicClientConfig,
	wallet: {
		chain: arbitrumGoerli,
		transport: http('https://arbitrum-goerli.public.blastapi.io'),
		account: mnemonicToAccount(MNEMONIC_TESTNET, { accountIndex: 0 }),
	} as WalletClientConfig,
} as const;

const publicClient = getPublicClientRs(configs.public, demoDataServiceConfig);
const publicClientArbSepolia = getPublicClientRs(configs.arbSepolia, {
	...demoDataServiceConfig,
	dataFeeds: ['DAI', 'USDC', 'BTC', 'ETH', 'ARB', 'SPY'],
	mockDataFeedValues: [0.9998, 1, 37691, 2090, 1.05, 450],
});
const publicClientMocked = getPublicClientRs(configs.public, mockedConfig);
const publicClientShouldMock = getPublicClientRs(configs.public, {
	...demoDataServiceConfig,
	shouldMock: (chain) => chain.id === 1234,
});
const publicClientShouldMock2 = getPublicClientRs(configs.public, {
	...mockedConfig,
	shouldMock: (chain) => chain.id === 1234,
});
const publicClientShouldMock3 = getPublicClientRs(configs.public, {
	...mockedConfig,
	shouldMock: (chain) => chain.id === arbitrumGoerli.id,
});

const walletClient = getWalletClientRs(configs.wallet, demoDataServiceConfig);

const initialDataFeeds = ['DAI', 'ETH', 'USDf', 'BTC'];

const contractNoFeeds = getContract({
	abi: Kresko.abi,
	address: Kresko.address,
	walletClient: walletClient,
	publicClient: publicClient,
});

const contract = getContract({
	abi: Kresko.abi,
	address: Kresko.address,
	walletClient: walletClient,
	publicClient: publicClient,
	dataFeeds: mockedConfig.dataFeeds,
	mockDataFeedValues: mockedConfig.mockDataFeedValues,
});

const test = async () => {
	const redstone = new RedstoneHelper(demoDataServiceConfig);

	const payloadArbSep = await publicClientArbSepolia.rs.getPayload(false);
	console.log(await redstone.getPrices(['BTC', 'ETH']));
	console.log('payload redstone', payloadArbSep);
	return;
	const payload = await redstone.getPayload(true, ['USDC'], [3]);
	// console.log('payload redstone class', payload);

	contract.stash.save('key', 'value');
	const valueContract = contract.stash.get('key');
	const valueWalletClient = walletClient.stash.get('key');
	const valuePublicClient = publicClient.stash.get('key');

	console.assert(valueContract === 'value', 'valueContract');
	console.assert(valueWalletClient === 'value', 'valueWalletClient');
	console.assert(valuePublicClient === 'value', 'valuePublicClient');

	const value = contract.stash.pop('key');
	console.assert(value === 'value', 'value after pop');

	const valueAfterPop = contract.stash.get('key');
	const valueAfterPop2 = walletClient.stash.get('key');
	const valueAfterPop3 = publicClient.stash.get('key');
	console.assert(valueAfterPop === undefined, 'valueAfterPop');
	console.assert(valueAfterPop2 === undefined, 'valueAfterPop2');
	console.assert(valueAfterPop3 === undefined, 'valueAfterPop3');

	const prices = await publicClient.rs.getPrices(initialDataFeeds);

	const shouldMock = publicClientShouldMock.rsMocking();
	const shouldMock2 = publicClientShouldMock2.rsMocking();
	const shouldMock3 = publicClientShouldMock3.rsMocking();
	console.assert(shouldMock === false, 'shouldMock');
	console.assert(shouldMock2 === false, 'shouldMock2');
	console.assert(shouldMock3 === true, 'shouldMock3');

	const mockedPayloadPublic = await publicClientMocked.rs.getPayload(true);
	const mockedPayloadContract = await contract.rs.getPayload(true);

	console.assert(mockedPayloadPublic.length > 0, 'mockedPayloadPublic');
	console.assert(mockedPayloadPublic === mockedPayloadContract, 'mockedPayloadPublic === mockedPayloadContract');

	const payloadPublic = await publicClientMocked.rs.getPayload(false);
	const payloadContract = await contract.rs.getPayload(false);
	console.assert(payloadPublic.length > 0, 'payloadPublic');
	console.assert(payloadPublic === payloadContract, 'payloadPublic === payloadContract');
	console.assert(mockedPayloadPublic !== payloadPublic, 'mockedPayloadPublic !== payloadPublic');
	console.assert(mockedPayloadContract !== payloadContract, 'mockedPayloadContract !== payloadContract');

	const length = initialDataFeeds.length;
	console.assert(prices.length === length, `prices: length is not ${length}, got ${prices.length}}`);

	const readResultPublicClientNoFeeds = await publicClient.rsRead({
		abi: Kresko.abi,
		functionName: 'kiss',
		address: Kresko.address,
	});

	console.assert(readResultPublicClientNoFeeds !== zeroAddress, 'readResultPublicClientNoFeeds');

	const readResultContractNoFeeds = await contractNoFeeds.read.kiss();

	console.assert(readResultContractNoFeeds === readResultPublicClientNoFeeds, 'readResultContractNoFeeds');

	const readResultContract = await contract.read.getAccountCollateralValue([walletClient.account.address]);

	console.assert(readResultContract > 0n, 'readResultContract: value is not > 0');

	const readResultPublicClient = await publicClient.rsRead({
		abi: Kresko.abi,
		functionName: 'getAccountCollateralValue',
		args: [walletClient.account.address],
		address: Kresko.address,
		dataFeeds: initialDataFeeds,
	});

	console.assert(readResultPublicClient > 0n, 'readResultPublicClient: value is not > 0');

	const writeGasEstimate = await contract.estimateGas.withdrawCollateral(
		[walletClient.account!.address, '0x04636F1e9e9B7F4d21310f0149b6f40458756c99', 1000n, 0n],
		{
			dataFeeds: ['DAI', 'ETH', 'USDf', 'BTC'],
			account: walletClient.account!,
		}
	);

	console.assert(writeGasEstimate > 0n, 'writeGasEstimate: value is not > 0');

	const simulateResult = await contract.simulate.withdrawCollateral(
		[walletClient.account!.address, '0x04636F1e9e9B7F4d21310f0149b6f40458756c99', 1000n, 0n],
		{
			account: walletClient.account,
			dataFeeds: ['DAI', 'ETH', 'USDf', 'BTC'],
		}
	);

	console.assert(simulateResult.result === undefined, 'simulateResult');

	const walletClientWriteResult = await walletClient.rsWrite({
		abi: Kresko.abi,
		functionName: 'withdrawCollateral',
		args: [walletClient.account!.address, '0x04636F1e9e9B7F4d21310f0149b6f40458756c99', 1000n, 0n],
		address: Kresko.address,
		dataFeeds: ['DAI', 'ETH', 'USDf', 'BTC'],
	});
	console.assert(!!walletClientWriteResult, 'walletClientWriteResult');
};

test()
	.then(() => console.info('Test run finished'))
	.catch((e) => {
		console.info('Test run failed');
		throw e;
	});
