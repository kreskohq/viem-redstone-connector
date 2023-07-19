import {
  PublicClientConfig,
  WalletClientConfig,
  http,
  zeroAddress,
} from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { arbitrumGoerli } from "viem/chains";
import { MNEMONIC_TESTNET } from "../env.ts";
import { getContract } from "../extensions.ts";
import { getPublicClientRs, getWalletClientRs } from "../index.ts";
import { Kresko } from "../utils/kresko.ts";
import { demoDataServiceConfig } from "../utils/mocks.ts";

const configs = {
  public: {
    chain: arbitrumGoerli,
    transport: http("https://arbitrum-goerli.public.blastapi.io"),
  } as PublicClientConfig,
  wallet: {
    chain: arbitrumGoerli,
    transport: http("https://arbitrum-goerli.public.blastapi.io"),
    account: mnemonicToAccount(MNEMONIC_TESTNET, { accountIndex: 0 }),
  } as WalletClientConfig,
} as const;

const publicClient = getPublicClientRs(configs.public, demoDataServiceConfig);
const walletClient = getWalletClientRs(configs.wallet, demoDataServiceConfig);

const initialDataFeeds = ["DAI", "ETH", "USDf", "BTC"];

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
  dataFeeds: initialDataFeeds,
});

const test = async () => {
  const prices = await publicClient.rsPrices(initialDataFeeds);
  const length = initialDataFeeds.length;
  console.assert(
    prices.length === length,
    `prices: length is not ${length}, got ${prices.length}}`
  );

  const readResultPublicClientNoFeeds = await publicClient.rsRead({
    abi: Kresko.abi,
    functionName: "kiss",
    address: Kresko.address,
  });

  console.assert(
    readResultPublicClientNoFeeds !== zeroAddress,
    "readResultPublicClientNoFeeds"
  );

  const readResultContractNoFeeds = await contractNoFeeds.read.kiss();

  console.assert(
    readResultContractNoFeeds === readResultPublicClientNoFeeds,
    "readResultContractNoFeeds"
  );

  const readResultContract = await contract.read.getAccountCollateralValue([
    walletClient.account.address,
  ]);

  console.assert(
    readResultContract > 0n,
    "readResultContract: value is not > 0"
  );

  const readResultPublicClient = await publicClient.rsRead({
    abi: Kresko.abi,
    functionName: "getAccountCollateralValue",
    args: [walletClient.account.address],
    address: Kresko.address,
    dataFeeds: initialDataFeeds,
  });

  console.assert(
    readResultPublicClient > 0n,
    "readResultPublicClient: value is not > 0"
  );

  const writeGasEstimate = await contract.estimateGas.withdrawCollateral(
    [
      walletClient.account.address,
      "0x04636F1e9e9B7F4d21310f0149b6f40458756c99",
      1000n,
      0n,
    ],
    {
      dataFeeds: ["DAI", "ETH", "USDf", "BTC"],
    }
  );

  console.assert(writeGasEstimate > 0n, "writeGasEstimate: value is not > 0");

  const simulateResult = await contract.simulate.withdrawCollateral(
    [
      walletClient.account.address,
      "0x04636F1e9e9B7F4d21310f0149b6f40458756c99",
      1000n,
      0n,
    ],
    {
      account: walletClient.account,
      dataFeeds: ["DAI", "ETH", "USDf", "BTC"],
    }
  );

  console.assert(simulateResult.result === undefined, "simulateResult");

  const walletClientWriteResult = await walletClient.rsWrite({
    abi: Kresko.abi,
    functionName: "withdrawCollateral",
    args: [
      walletClient.account.address,
      "0x04636F1e9e9B7F4d21310f0149b6f40458756c99",
      1000n,
      0n,
    ],
    address: Kresko.address,
    dataFeeds: ["DAI", "ETH", "USDf", "BTC"],
  });
  console.assert(!!walletClientWriteResult, "walletClientWriteResult");
};

test()
  .then(() => console.info("Test run finished"))
  .catch((e) => {
    console.info("Test run failed");
    throw e;
  });
