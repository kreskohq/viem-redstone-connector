import {
  PublicClientConfig,
  WalletClientConfig,
  createPublicClient,
  createWalletClient,
} from "viem";
import { DataPackageRequestParams, RedstoneHelper } from "./redstone.ts";
import {
  getEstimateContractGasFn,
  getRsReadFn,
  getRsWriteFn,
  getSimulateContractFn,
  getContract,
} from "./extensions.ts";

/**
 * Viem getContract with Redstone calldata wrapping for read/write/simulate/estimateGas
 */
export { getContract };
/**
 * Viem public client with extended Redstone methods
 * @param config Viem public client config
 * @param redstoneConfig Redstone config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsRead`, `rsEstimateGas`, `rsSimulate`
 */
export const getPublicClientRs = (
  config: PublicClientConfig,
  redstoneConfig: DataPackageRequestParams,
  dataFeeds?: string[]
) => {
  const redstone = new RedstoneHelper(redstoneConfig);
  return createPublicClient(config).extend((client) => ({
    dataFeeds: dataFeeds,
    rsPrices: redstone.getPrices,
    rsDataPackage: redstone.getDataPackage,
    rsRead: getRsReadFn(dataFeeds, redstone, client),
    rsEstimateGas: getEstimateContractGasFn(dataFeeds, redstone, client),
    rsSimulate: getSimulateContractFn(dataFeeds, redstone, client),
  }));
};

/**
 * Viem wallet client with Redstone wrapper methods
 * @param config Viem wallet client config
 * @param redstoneConfig Redstone config
 * @param dataFeeds Hoisted data feeds to be used in the client, if any
 * @returns Viem client with extended Redstone methods `rsPrices`, `rsDataPackage`, `rsWrite`, `rsEstimateGas`
 *
 */
export const getWalletClientRs = (
  config: WalletClientConfig,
  redstoneConfig: DataPackageRequestParams,
  dataFeeds?: string[]
) => {
  const redstone = new RedstoneHelper(redstoneConfig);
  return createWalletClient(config).extend((client) => {
    return {
      dataFeeds: dataFeeds,
      rsPrices: redstone.getPrices,
      rsDataPackage: redstone.getDataPackage,
      rsWrite: getRsWriteFn(dataFeeds, redstone, client),
      rsEstimateGas: getEstimateContractGasFn(dataFeeds, redstone, client),
    };
  });
};
