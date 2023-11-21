import {
	createPublicClient,
	createWalletClient,
	type PublicClient,
	type WalletClient,
	type PublicClientConfig,
	type WalletClientConfig,
	Chain,
} from 'viem';

import { getEstimateContractGasFn, getRsReadFn, getRsWriteFn, getSimulateContractFn } from './extensions.js';
import { RedstoneHelper } from './redstone/index.js';
import { DataPackagesRequestParams } from './redstone/types.js';

/**
 * Viem getContract with Redstone calldata wrapping for read/write/simulate/estimateGas
 */
export { getContract, splitSignature } from './extensions.js';

const stashMap = new Map<string, any>();

const stash = {
	save: (key: string, value: any) => stashMap.set(key, value),
	get: (key: string) => stashMap.get(key),
	pop: (key: string) => {
		const value = stashMap.get(key);
		stashMap.delete(key);
		return value;
	},
	clear: () => stashMap.clear(),
};

export type RedstoneConfig = DataPackagesRequestParams & {
	mockDataFeedValues?: number[];
	shouldMock?: (chain: Chain) => boolean;
};
/**
 * Viem public client with extended Redstone methods
 * @param config Viem public client config
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsRead`, `rsEstimateGas`, `rsSimulate`
 */
export const getPublicClientRs = (config: PublicClientConfig, redstoneConfig: RedstoneConfig) =>
	extendPublicClient(createPublicClient(config), redstoneConfig);

/**
 * Extend a viem public client with Redstone methods
 * @param publicClient Viem public client
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsRead`, `rsEstimateGas`, `rsSimulate`
 */
export const extendPublicClient = (publicClient: PublicClient, redstoneConfig: RedstoneConfig) => {
	return publicClient.extend((client) => {
		const rs = new RedstoneHelper(redstoneConfig);
		const shouldMock = (chain: Chain) =>
			redstoneConfig.shouldMock ? redstoneConfig.shouldMock(chain) : rs.mockDataFeedValues.length > 0 ? true : false;
		return {
			stash,
			rs,
			rsMocking: (chain = client.chain) => shouldMock(chain),
			rsRead: getRsReadFn(rs, client, shouldMock),
			rsEstimateGas: getEstimateContractGasFn(rs, client, shouldMock),
			rsSimulate: getSimulateContractFn(rs, client, shouldMock),
		};
	});
};

/**
 * Get a viem wallet client with Redstone wrapper methods
 * @param config Viem wallet client config
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsWrite`, `rsEstimateGas`
 *
 */
export const getWalletClientRs = (config: WalletClientConfig, redstoneConfig: RedstoneConfig) =>
	extendWalletClient(createWalletClient(config), redstoneConfig);

/**
 * Extend a viem wallet client with Redstone methods
 * @param walletClient Viem wallet client
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsWrite`, `rsEstimateGas`
 *
 */
export const extendWalletClient = (walletClient: WalletClient, redstoneConfig: RedstoneConfig) => {
	return walletClient.extend((client) => {
		const rs = new RedstoneHelper(redstoneConfig);
		const shouldMock = (chain: Chain) =>
			redstoneConfig.shouldMock ? redstoneConfig.shouldMock(chain) : rs.mockDataFeedValues.length > 0 ? true : false;
		return {
			stash,
			rs,
			rsMocking: (chain = client.chain) => shouldMock(chain),
			rsWrite: getRsWriteFn(rs, client, shouldMock),
			rsEstimateGas: getEstimateContractGasFn(rs, client, shouldMock),
		};
	});
};
export type ExtendedPublicClient = ReturnType<typeof extendPublicClient>;
export type ExtendedWalletClient = ReturnType<typeof extendWalletClient>;
