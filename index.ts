import {
	createPublicClient,
	createWalletClient,
	type PublicClient,
	type WalletClient,
	type PublicClientConfig,
	type WalletClientConfig,
} from 'viem';

import { getEstimateContractGasFn, getRsReadFn, getRsWriteFn, getSimulateContractFn } from './extensions.js';
import { RedstoneHelper, type DataPackageRequestParams } from './redstone/index.js';

/**
 * Viem getContract with Redstone calldata wrapping for read/write/simulate/estimateGas
 */
export { getContract, splitSignature } from './extensions.js';

/**
 * Viem public client with extended Redstone methods
 * @param config Viem public client config
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsRead`, `rsEstimateGas`, `rsSimulate`
 */
export const getPublicClientRs = (
	config: PublicClientConfig,
	redstoneConfig: DataPackageRequestParams,
	dataFeeds?: string[]
) => extendPublicClient(createPublicClient(config), redstoneConfig, dataFeeds);

/**
 * Extend a viem public client with Redstone methods
 * @param publicClient Viem public client
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsRead`, `rsEstimateGas`, `rsSimulate`
 */
export const extendPublicClient = (
	publicClient: PublicClient,
	redstoneConfig: DataPackageRequestParams,
	dataFeeds?: string[]
) => {
	const redstone = new RedstoneHelper(redstoneConfig);
	return publicClient.extend((client) => ({
		dataFeeds: dataFeeds,
		rsPrices: redstone.getPrices,
		rsDataPackage: redstone.getDataPackage,
		rsRead: getRsReadFn(dataFeeds, redstone, client),
		rsEstimateGas: getEstimateContractGasFn(dataFeeds, redstone, client),
		rsSimulate: getSimulateContractFn(dataFeeds, redstone, client),
	}));
};

/**
 * Get a viem wallet client with Redstone wrapper methods
 * @param config Viem wallet client config
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsWrite`, `rsEstimateGas`
 *
 */
export const getWalletClientRs = (
	config: WalletClientConfig,
	redstoneConfig: DataPackageRequestParams,
	dataFeeds?: string[]
) => extendWalletClient(createWalletClient(config), redstoneConfig, dataFeeds);

/**
 * Extend a viem wallet client with Redstone methods
 * @param walletClient Viem wallet client
 * @param redstoneConfig Redstone data service config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsWrite`, `rsEstimateGas`
 *
 */
export const extendWalletClient = (
	walletClient: WalletClient,
	redstoneConfig: DataPackageRequestParams,
	dataFeeds?: string[]
) => {
	const redstone = new RedstoneHelper(redstoneConfig);

	return walletClient.extend((client) => ({
		dataFeeds: dataFeeds,
		rsPrices: redstone.getPrices,
		rsDataPackage: redstone.getDataPackage,
		rsWrite: getRsWriteFn(dataFeeds, redstone, client),
		rsEstimateGas: getEstimateContractGasFn(dataFeeds, redstone, client),
	}));
};
export type ExtendedPublicClient = ReturnType<typeof extendPublicClient>;
export type ExtendedWalletClient = ReturnType<typeof extendWalletClient>;
