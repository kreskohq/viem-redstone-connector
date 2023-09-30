import type { AbiEvent } from "abitype";
import {
  createPublicClient,
  createWalletClient,
  decodeFunctionResult,
  encodeFunctionData,
  getContractError,
  toBytes,
  toHex,
  type Abi,
  type Account,
  type Address,
  type BaseError,
  type CallParameters,
  type Chain,
  type CreateContractEventFilterParameters,
  type DecodeFunctionResultParameters,
  type EncodeFunctionDataParameters,
  type EstimateContractGasReturnType,
  type EstimateGasParameters,
  type GetContractParameters,
  type ReadContractParameters,
  type ReadContractReturnType,
  type SimulateContractParameters,
  type SimulateContractReturnType,
  type Transport,
  type WatchContractEventParameters,
} from "viem/_types";
import { parseAccount } from "viem/accounts";
import { estimateGas } from "viem/actions";
import { getPublicClientRs, getWalletClientRs } from "./index";
import { RedstoneHelper } from "./redstone";
import * as LocalTypes from "./types";

export const getRsReadFn = (
  initialDataFeeds: string[],
  redstone: RedstoneHelper,
  client: ReturnType<typeof createPublicClient>
) =>
  async function rsRead<
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string | undefined = undefined
  >({
    abi,
    functionName,
    args,
    address,
    account,
    dataFeeds = initialDataFeeds,
    mockDataFeedValues,
    ...callParams
  }: LocalTypes.RsReadParams<TAbi, TFunctionName>) {
    try {
      const argsForEncoding = {
        abi,
        args,
        functionName,
      } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>;

      const calldata =
        encodeFunctionData(argsForEncoding) +
        (dataFeeds
          ? await redstone.getPayload(dataFeeds, mockDataFeedValues)
          : "");
      const result = await client.call({
        to: address,
        from: account,
        data: calldata,
        ...callParams,
      } as unknown as CallParameters);
      return decodeFunctionResult({
        abi,
        args,
        functionName,
        data: result?.data ?? "0x",
      } as DecodeFunctionResultParameters<TAbi, TFunctionName>) as ReadContractReturnType<
        TAbi,
        TFunctionName
      >;
    } catch (err) {
      throw getContractError(err as BaseError, {
        abi: abi as Abi,
        address,
        args,
        docsPath: "/docs/contract/readContract",
        functionName,
      });
    }
  };

export const getRsWriteFn = (
  initialDataFeeds: string[],
  redstone: RedstoneHelper,
  client: ReturnType<typeof createWalletClient>
) =>
  async function <
    TAcc extends Account | undefined = Account | undefined,
    TAbi extends Abi | readonly unknown[] = Abi,
    TChain extends Chain | undefined = Chain,
    TFN extends string | undefined = string,
    TChainOverride extends Chain | undefined = undefined
  >({
    abi,
    functionName,
    args,
    address,
    account,
    dataFeeds = initialDataFeeds,
    mockDataFeedValues,
    dataSuffix,
    chain,
    ...request
  }: LocalTypes.WriteParamsRs<TAbi, TFN, TChain, TAcc, TChainOverride>) {
    try {
      const argsForEncoding = {
        abi,
        args,
        functionName,
      } as unknown as EncodeFunctionDataParameters<TAbi, TFN>;

      const calldata =
        encodeFunctionData(argsForEncoding) +
        (dataFeeds
          ? await redstone.getPayload(dataFeeds, mockDataFeedValues)
          : "");

      return await client.sendTransaction({
        data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        account: account || (client.account as Account),
        chain: chain || client.chain,
        ...request,
      });
    } catch (err) {
      throw err;
    }
  };

export const getRsEstimateFn = (
  initialDataFeeds: string[],
  redstone: RedstoneHelper,
  client: ReturnType<typeof createWalletClient>
) =>
  async function <
    TAcc extends Account | undefined = Account,
    TAbi extends Abi | readonly unknown[] = Abi,
    TChain extends Chain | undefined = Chain,
    TFN extends string | undefined = string,
    TChainOverride extends Chain | undefined = undefined
  >({
    abi,
    functionName,
    args,
    address,
    account,
    dataFeeds = initialDataFeeds,
    mockDataFeedValues,
    dataSuffix,
    chain,
    ...request
  }: LocalTypes.WriteParamsRs<TAbi, TFN, TChain, TAcc, TChainOverride>) {
    try {
      const argsForEncoding = {
        abi,
        args,
        functionName,
      } as unknown as EncodeFunctionDataParameters<TAbi, TFN>;

      const calldata =
        encodeFunctionData(argsForEncoding) +
        (dataFeeds
          ? await redstone.getPayload(dataFeeds, mockDataFeedValues)
          : "");

      return await client.sendTransaction({
        data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        account: account || (client.account as Account),
        chain: chain || client.chain,
        ...request,
      });
    } catch (err) {
      throw err;
    }
  };

export const getEstimateContractGasFn = (
  initialDataFeeds: string[],
  redstone: RedstoneHelper,
  client:
    | ReturnType<typeof createPublicClient>
    | ReturnType<typeof createWalletClient>
) =>
  async function <
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string,
    TChain extends Chain | undefined,
    TAccount extends Account | undefined = undefined
  >({
    abi,
    address,
    args,
    functionName,
    dataFeeds = initialDataFeeds,
    mockDataFeedValues,
    ...request
  }: LocalTypes.EstimateContractGasParamsRs<
    TAbi,
    TFunctionName,
    TChain,
    TAccount
  >): Promise<EstimateContractGasReturnType> {
    const data =
      encodeFunctionData({
        abi,
        args,
        functionName,
      } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>) +
      (await redstone.getPayload(dataFeeds, mockDataFeedValues));

    try {
      const gas = await estimateGas(
        client as any,
        {
          data,
          to: address,
          ...request,
        } as unknown as EstimateGasParameters<TChain>
      );
      return gas;
    } catch (err) {
      const account = request.account
        ? parseAccount(request.account)
        : undefined;

      throw getContractError(err as BaseError, {
        abi: abi as Abi,
        address,
        args,
        docsPath: "/docs/contract/simulateContract",
        functionName,
        sender: account?.address,
      });
    }
  };

/**
 * Gets type-safe interface for performing contract-related actions with a specific `abi` and `address`.
 *
 * - Docs https://viem.sh/docs/contract/getContract.html
 *
 * Using Contract Instances can make it easier to work with contracts if you don't want to pass the `abi` and `address` properites every time you perform contract actions, e.g. [`readContract`](https://viem.sh/docs/contract/readContract.html), [`writeContract`](https://viem.sh/docs/contract/writeContract.html), [`estimateContractGas`](https://viem.sh/docs/contract/estimateContractGas.html), etc.
 *
 * @example
 * import { createPublicClient, getContract, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const publicClient = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const contract = getContract({
 *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
 *   abi: parseAbi([
 *     'function balanceOf(address owner) view returns (uint256)',
 *     'function ownerOf(uint256 tokenId) view returns (address)',
 *     'function totalSupply() view returns (uint256)',
 *   ]),
 *   publicClient,
 * })
 */

export const getSimulateContractFn = (
  initialDataFeeds: string[],
  redstone: RedstoneHelper,
  client: ReturnType<typeof createPublicClient>
) =>
  async function <
    TChain extends Chain | undefined,
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string,
    TChainOverride extends Chain | undefined
  >({
    abi,
    address,
    args,
    dataSuffix,
    functionName,
    dataFeeds = initialDataFeeds,
    mockDataFeedValues,
    ...callRequest
  }: LocalTypes.SimulateContractParametersRs<
    TAbi,
    TFunctionName,
    TChain,
    TChainOverride
  >): Promise<
    SimulateContractReturnType<TAbi, TFunctionName, TChain, TChainOverride> & {
      dataFeeds?: string[];
      mockDataFeedValues?: number[];
    }
  > {
    const account = callRequest.account
      ? parseAccount(callRequest.account)
      : undefined;
    const calldata =
      encodeFunctionData({
        abi,
        args,
        functionName,
      } as unknown as EncodeFunctionDataParameters<TAbi, TFunctionName>) +
      (await redstone.getPayload(dataFeeds, mockDataFeedValues));
    try {
      const { data } = await client.call({
        batch: false,
        data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
        to: address,
        ...callRequest,
      } as unknown as CallParameters<TChain>);
      const result = decodeFunctionResult({
        abi,
        args,
        functionName,
        data: data || "0x",
      } as DecodeFunctionResultParameters);
      return {
        result,
        request: {
          abi,
          address,
          args,
          dataSuffix,
          functionName,
          ...callRequest,
        },
      } as unknown as SimulateContractReturnType<
        TAbi,
        TFunctionName,
        TChain,
        TChainOverride
      >;
    } catch (err) {
      throw getContractError(err as BaseError, {
        abi: abi as Abi,
        address,
        args,
        docsPath: "/docs/contract/simulateContract",
        functionName,
        sender: account?.address,
      });
    }
  };
/**
 * @internal exporting for testing only
 */
export function getFunctionParameters(
  values: [args?: readonly unknown[], options?: object]
) {
  const hasArgs = values.length && Array.isArray(values[0]);
  const args = hasArgs ? values[0]! : [];
  const options = (hasArgs ? values[1] : values[0]) ?? {};
  return { args, options };
}

/**
 * @internal exporting for testing only
 */
export function getEventParameters(
  values: [args?: object | unknown[], options?: object],
  abiEvent: AbiEvent
) {
  let hasArgs = false;
  // If first item is array, must be `args`
  if (Array.isArray(values[0])) hasArgs = true;
  // Check if first item is `args` or `options`
  else if (values.length === 1) {
    // if event has indexed inputs, must have `args`
    hasArgs = abiEvent.inputs.some((x) => x.indexed);
    // If there are two items in array, must have `args`
  } else if (values.length === 2) {
    hasArgs = true;
  }

  const args = hasArgs ? values[0]! : undefined;
  const options = (hasArgs ? values[1] : values[0]) ?? {};
  return { args, options };
}
export function getContract<
  TTransport extends Transport,
  TAddress extends Address,
  TAbi extends Abi | readonly unknown[],
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = Account | undefined,
  TPublicClient extends ReturnType<typeof getPublicClientRs> = ReturnType<
    typeof getPublicClientRs
  >,
  TWalletClient extends ReturnType<typeof getWalletClientRs> = ReturnType<
    typeof getWalletClientRs
  >
>({
  abi,
  address,
  publicClient,
  walletClient,
  dataFeeds,
  mockDataFeedValues,
}: GetContractParameters<
  TTransport,
  TChain,
  TAccount,
  TAbi,
  TPublicClient,
  TWalletClient,
  TAddress
> & {
  dataFeeds?: string[];
  mockDataFeedValues?: number[];
}): LocalTypes.GetContractReturnType<
  TAbi,
  TPublicClient,
  TWalletClient,
  TAddress
> & {
  dataFeeds: typeof dataFeeds;
} {
  const hasPublicClient = publicClient !== undefined && publicClient !== null;
  const hasWalletClient = walletClient !== undefined && walletClient !== null;

  const contract: {
    [_ in
      | "abi"
      | "address"
      | "createEventFilter"
      | "estimateGas"
      | "read"
      | "dataFeeds"
      | "simulate"
      | "watchEvent"
      | "write"]?: unknown;
  } = {};

  let hasReadFunction = false;
  let hasWriteFunction = false;
  let hasEvent = false;
  for (const item of abi as Abi) {
    if (item.type === "function")
      if (item.stateMutability === "view" || item.stateMutability === "pure")
        hasReadFunction = true;
      else hasWriteFunction = true;
    else if (item.type === "event") hasEvent = true;
    // Exit early if all flags are `true`
    if (hasReadFunction && hasWriteFunction && hasEvent) break;
  }

  if (hasPublicClient) {
    if (hasReadFunction)
      contract.read = new Proxy(
        {},
        {
          get(_, functionName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[],
                options?: Omit<
                  LocalTypes.RsReadParams,
                  "abi" | "address" | "functionName" | "args"
                >
              ]
            ) => {
              const { args, options } = getFunctionParameters(parameters);

              return publicClient.rsRead({
                abi,
                address,
                functionName,
                args,
                ...options,
                dataFeeds: parameters[1]?.dataFeeds || dataFeeds,
                mockDataFeedValues:
                  parameters[1]?.mockDataFeedValues || mockDataFeedValues,
              } as ReadContractParameters);
            };
          },
        }
      );

    if (hasWriteFunction)
      contract.simulate = new Proxy(
        {},
        {
          get(_, functionName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[],
                options?: Omit<
                  LocalTypes.SimulateContractParametersRs,
                  "abi" | "address" | "functionName" | "args"
                >
              ]
            ) => {
              const { args, options } = getFunctionParameters(parameters);
              return publicClient.rsSimulate({
                abi,
                address,
                functionName,
                dataFeeds: parameters[1]?.dataFeeds || dataFeeds,
                mockDataFeedValues:
                  parameters[1]?.mockDataFeedValues || mockDataFeedValues,
                args,
                ...options,
              } as SimulateContractParameters & {
                dataFeeds?: string[];
                mockDataFeedValues?: number[];
              });
            };
          },
        }
      );

    if (hasEvent) {
      contract.createEventFilter = new Proxy(
        {},
        {
          get(_, eventName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[] | object,
                options?: Omit<
                  CreateContractEventFilterParameters,
                  "abi" | "address" | "eventName" | "args"
                >
              ]
            ) => {
              const abiEvent = (abi as readonly any[]).find(
                (x: AbiEvent) => x.type === "event" && x.name === eventName
              );
              const { args, options } = getEventParameters(
                parameters,
                abiEvent!
              );
              return publicClient.createContractEventFilter({
                abi,
                address,
                eventName,
                args,
                ...options,
              } as unknown as CreateContractEventFilterParameters);
            };
          },
        }
      );
      contract.watchEvent = new Proxy(
        {},
        {
          get(_, eventName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[] | object,
                options?: Omit<
                  WatchContractEventParameters,
                  "abi" | "address" | "eventName"
                >
              ]
            ) => {
              const abiEvent = (abi as readonly AbiEvent[]).find(
                (x: AbiEvent) => x.type === "event" && x.name === eventName
              );
              const { args, options } = getEventParameters(
                parameters,
                abiEvent!
              );
              return publicClient.watchContractEvent({
                abi,
                address,
                eventName,
                args,
                ...options,
              } as unknown as WatchContractEventParameters);
            };
          },
        }
      );
    }
  }

  if (hasWalletClient) {
    if (hasWriteFunction)
      contract.write = new Proxy(
        {},
        {
          get(_, functionName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[],
                options?: Omit<
                  LocalTypes.WriteParamsRs,
                  "abi" | "address" | "functionName" | "args"
                >
              ]
            ) => {
              const { args, options } = getFunctionParameters(parameters);

              return walletClient.rsWrite({
                abi,
                address,
                functionName,
                args,
                ...options,
                dataFeeds: parameters[1]?.dataFeeds || dataFeeds,
                mockDataFeedValues:
                  parameters[1]?.mockDataFeedValues || mockDataFeedValues,
              } as unknown as LocalTypes.WriteParamsRs<TAbi, typeof functionName, TChain, TAccount>);
            };
          },
        }
      );
  }

  if (hasPublicClient || hasWalletClient)
    if (hasWriteFunction)
      contract.estimateGas = new Proxy(
        {},
        {
          get(_, functionName: string) {
            return (
              ...parameters: [
                args?: readonly unknown[],
                options?: Omit<
                  LocalTypes.EstimateContractGasParamsRs,
                  "abi" | "address" | "functionName" | "args"
                >
              ]
            ) => {
              const { args, options } = getFunctionParameters(parameters);
              const client = walletClient ?? publicClient;
              return client.rsEstimateGas({
                abi,
                address,
                functionName,
                args,
                ...options,
                dataFeeds: parameters[1]?.dataFeeds || dataFeeds,
                mockDataFeedValues:
                  parameters[1]?.mockDataFeedValues || mockDataFeedValues,
                account:
                  (options as LocalTypes.EstimateContractGasParamsRs).account ??
                  walletClient.account,
              } as LocalTypes.EstimateContractGasParamsRs);
            };
          },
        }
      );
  contract.dataFeeds =
    dataFeeds || walletClient?.dataFeeds || publicClient?.dataFeeds;
  contract.address = address;
  contract.abi = abi;

  return contract as unknown as LocalTypes.GetContractReturnType<
    TAbi,
    TPublicClient,
    TWalletClient,
    TAddress
  > & {
    dataFeeds: typeof dataFeeds;
  };
}

export const splitSignatureBase64 = (signature: string) => {
  const bufferSignature = Buffer.from(signature, "base64");
  const [r, s, v] = [
    toHex(bufferSignature.subarray(0, 32)),
    toHex(bufferSignature.subarray(32, 64)),
    bufferSignature[64],
  ];

  const recoveryParam = 1 - (v % 2);

  // Compute _vs from recoveryParam and s
  if (recoveryParam) {
    bufferSignature[32] |= 0x80;
  }
  const _vs = toHex(bufferSignature.subarray(32, 64));
  const compact = r + _vs.substring(2);

  return {
    r,
    s,
    v,
    _vs: toHex(bufferSignature.subarray(32, 64)),
    compact,
  };
};

export const splitSignature = (signature: string) => {
  const bytesSignature = toBytes(signature);
  const [r, s, v] = [
    toHex(bytesSignature.slice(0, 32)),
    toHex(bytesSignature.slice(32, 64)),
    bytesSignature[64],
  ];

  const recoveryParam = 1 - (v % 2);

  // Compute _vs from recoveryParam and s
  if (recoveryParam) {
    bytesSignature[32] |= 0x80;
  }
  const _vs = toHex(bytesSignature.subarray(32, 64));
  const compact = r + _vs.substring(2);

  return {
    r,
    s,
    v,
    _vs: toHex(bytesSignature.subarray(32, 64)),
    compact,
  };
};
