import {
  AbiEvent,
  AbiFunction,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from "abitype";
import {
  DataPackage,
  INumericDataPoint,
  IStringDataPoint,
  utils,
} from "redstone-protocol";
import {
  Chain,
  Account,
  Abi,
  WriteContractParameters,
  ReadContractParameters,
  ContractFunctionConfig,
  GetValue,
  Hex,
  SendTransactionParameters,
  Narrow,
  Address,
  PublicClient,
  WalletClient,
  CreateContractEventFilterParameters,
  WatchContractEventParameters,
  WatchContractEventReturnType,
  WriteContractReturnType,
  ReadContractReturnType,
  EstimateContractGasReturnType,
  SimulateContractReturnType,
  CreateContractEventFilterReturnType,
  EstimateGasParameters,
  CallParameters,
} from "viem";
import {
  AbiEventParametersToPrimitiveTypes,
  MaybeExtractEventArgsFromAbi,
} from "viem/dist/types/types/contract";
import {
  IsNarrowable,
  IsNever,
  IsUndefined,
  Or,
  Prettify,
  UnionOmit,
} from "viem/dist/types/types/utils";

export type TestFeedConfig = { dataFeedId: string; value: number }[];
export interface SimpleNumericMockConfig {
  mockSignersCount: number;
  timestampMilliseconds?: number;
  dataPoints: INumericDataPoint[];
}

export interface MockPackageArgs {
  mockSignerIndex: MockSignerIndex;
  timestampMilliseconds?: number;
}

export interface MockNumericPackageArgs extends MockPackageArgs {
  dataPoints: INumericDataPoint[];
}

export interface MockStringPackageArgs extends MockPackageArgs {
  dataPoints: IStringDataPoint[];
}

export interface MockPackageWithOneNumericDataPointArgs
  extends MockPackageArgs,
    INumericDataPoint {}

export interface MockPackageWithOneBytesDataPointArgs extends MockPackageArgs {
  dataFeedId?: utils.ConvertableToBytes32;
  hexValue: string;
}

export type MockSignerIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;

export interface MockDataPackageConfig {
  signer: MockSignerAddress;
  dataPackage: DataPackage;
}

export type MockSignerAddress =
  | "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  | "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  | "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  | "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
  | "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
  | "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
  | "0x976EA74026E726554dB657fA54763abd0C3a0aa9"
  | "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
  | "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"
  | "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
  | "0xBcd4042DE499D14e55001CcbB24a551F3b954096"
  | "0x71bE63f3384f5fb98995898A86B02Fb2426c5788"
  | "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"
  | "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec"
  | "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
  | "0xcd3B766CCDd6AE721141F452C550Ca635964ce71"
  | "0x2546BcD3c84621e976D8185a91A922aE77ECEc30"
  | "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E"
  | "0xdD2FD4581271e230360230F9337D5c0430Bf44C0"
  | "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

export type RsReadParams<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string | undefined = undefined
> = ReadContractParameters<TAbi, TFunctionName> & {
  dataFeeds?: string[];
  mockDataFeedValues?: number[];
};

export type WriteParamsRs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = undefined,
  TChainOverride extends Chain | undefined = undefined
> = ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
  UnionOmit<
    SendTransactionParameters<TChain, TAccount, TChainOverride>,
    "chain" | "to" | "data" | "value"
  > &
  GetChainOverride<TChainOverride> &
  GetValue<
    TAbi,
    TFunctionName,
    SendTransactionParameters<
      TChain,
      TAccount,
      TChainOverride
    > extends SendTransactionParameters
      ? SendTransactionParameters<TChain, TAccount, TChainOverride>["value"]
      : SendTransactionParameters["value"]
  > & {
    /** Data to append to the end of the calldata. Useful for adding a ["domain" tag](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f). */
    dataSuffix?: Hex;
    dataFeeds?: string[];
    mockDataFeedValues?: number[];
  };

export type EstimateContractGasParamsRs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = undefined
> = ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
  UnionOmit<EstimateGasParamsRs<TChain, TAccount>, "data" | "to" | "value"> &
  GetValue<
    TAbi,
    TFunctionName,
    EstimateGasParameters<TChain> extends EstimateGasParameters
      ? EstimateGasParameters<TChain>["value"]
      : EstimateGasParameters["value"]
  >;

export type EstimateGasParamsRs<
  TChain extends Chain | undefined = Chain | undefined,
  TAccount extends Account | undefined = undefined
> = EstimateGasParameters<TChain, TAccount> & {
  dataFeeds?: string[];
  mockDataFeedValues?: number[];
};
// Override viem type to fix chain requirement
export type GetChainOverride<
  TChainOverride extends Chain | undefined = undefined
> = [TChainOverride] extends [undefined]
  ? { chain?: TChainOverride | null }
  : { chain: TChainOverride | null };

export type GetContractReturnType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TPublicClient extends PublicClient | unknown = unknown,
  TWalletClient extends WalletClient | unknown = unknown,
  TAddress extends Address = Address,
  _EventNames extends string = TAbi extends Abi
    ? Abi extends TAbi
      ? string
      : ExtractAbiEventNames<TAbi>
    : string,
  _ReadFunctionNames extends string = TAbi extends Abi
    ? Abi extends TAbi
      ? string
      : ExtractAbiFunctionNames<TAbi, "pure" | "view">
    : string,
  _WriteFunctionNames extends string = TAbi extends Abi
    ? Abi extends TAbi
      ? string
      : ExtractAbiFunctionNames<TAbi, "nonpayable" | "payable">
    : string,
  _Narrowable extends boolean = IsNarrowable<TAbi, Abi>
> = Prettify<
  (TPublicClient extends PublicClient
    ? (IsNever<_ReadFunctionNames> extends true
        ? unknown
        : {
            /**
             * Calls a read-only function on a contract, and returns the response.
             *
             * A "read-only" function (constant function) on a Solidity contract is denoted by a `view` or `pure` keyword. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.
             *
             * Internally, `read` uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html).
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
             *   ]),
             *   publicClient,
             * })
             * const result = await contract.read.balanceOf(['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'])
             * // 424122n
             */
            read: {
              [FunctionName in _ReadFunctionNames]: GetReadFunction<
                _Narrowable,
                TAbi,
                FunctionName
              >;
            };
          }) &
        (IsNever<_WriteFunctionNames> extends true
          ? unknown
          : {
              /**
               * Estimates the gas necessary to complete a transaction without submitting it to the network.
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
               *   abi: parseAbi(['function mint() public']),
               *   publicClient,
               * })
               * const gas = await contract.estimateGas.mint({
               *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
               * })
               */
              estimateGas: {
                [FunctionName in _WriteFunctionNames]: GetEstimateFunction<
                  _Narrowable,
                  TPublicClient["chain"],
                  undefined,
                  TAbi,
                  FunctionName
                >;
              };
              /**
               * Simulates/validates a contract interaction. This is useful for retrieving return data and revert reasons of contract write functions.
               *
               * This function does not require gas to execute and does not change the state of the blockchain. It is almost identical to [`readContract`](https://viem.sh/docs/contract/readContract.html), but also supports contract write functions.
               *
               * Internally, `simulate` uses a [Public Client](https://viem.sh/docs/clients/public.html) to call the [`call` action](https://viem.sh/docs/actions/public/call.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html).
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
               *   abi: parseAbi(['function mint() public']),
               *   publicClient,
               * })
               * const result = await contract.simulate.mint({
               *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
               * })
               */
              simulate: {
                [FunctionName in _WriteFunctionNames]: GetSimulateFunction<
                  _Narrowable,
                  TPublicClient["chain"],
                  TAbi,
                  FunctionName
                >;
              };
            }) &
        (IsNever<_EventNames> extends true
          ? unknown
          : {
              /**
               * Creates a Filter to retrieve event logs that can be used with [`getFilterChanges`](https://viem.sh/docs/actions/public/getFilterChanges.html) or [`getFilterLogs`](https://viem.sh/docs/actions/public/getFilterLogs.html).
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
               *   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
               *   publicClient,
               * })
               * const filter = await contract.createEventFilter.Transfer()
               */
              createEventFilter: {
                [EventName in _EventNames]: GetEventFilter<
                  _Narrowable,
                  TAbi,
                  EventName
                >;
              };
              /**
               * Watches and returns emitted contract event logs.
               *
               * This Action will batch up all the event logs found within the [`pollingInterval`](https://viem.sh/docs/contract/watchContractEvent.html#pollinginterval-optional), and invoke them via [`onLogs`](https://viem.sh/docs/contract/watchContractEvent.html#onLogs).
               *
               * `watchEvent` will attempt to create an [Event Filter](https://viem.sh/docs/contract/createContractEventFilter.html) and listen to changes to the Filter per polling interval, however, if the RPC Provider does not support Filters (e.g. `eth_newFilter`), then `watchEvent` will fall back to using [`getLogs`](https://viem.sh/docs/actions/public/getLogs.html) instead.
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
               *   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
               *   publicClient,
               * })
               * const filter = await contract.createEventFilter.Transfer()
               * const unwatch = contract.watchEvent.Transfer(
               *   { from: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b' },
               *   { onLogs: (logs) => console.log(logs) },
               * )
               */
              watchEvent: {
                [EventName in _EventNames]: GetWatchEvent<
                  _Narrowable,
                  TAbi,
                  EventName
                >;
              };
            })
    : unknown) &
    (TWalletClient extends WalletClient
      ? IsNever<_WriteFunctionNames> extends true
        ? unknown
        : {
            /**
             * Estimates the gas necessary to complete a transaction without submitting it to the network.
             *
             * @example
             * import { createWalletClient, getContract, http, parseAbi } from 'viem'
             * import { mainnet } from 'viem/chains'
             *
             * const walletClient = createWalletClient({
             *   chain: mainnet,
             *   transport: http(),
             * })
             * const contract = getContract({
             *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
             *   abi: parseAbi(['function mint() public']),
             *   walletClient,
             * })
             * const gas = await contract.estimateGas.mint({
             *   account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
             * })
             */
            estimateGas: {
              [FunctionName in _WriteFunctionNames]: GetEstimateFunction<
                _Narrowable,
                TWalletClient["chain"],
                TWalletClient["account"],
                TAbi,
                FunctionName
              >;
            };
            /**
             * Executes a write function on a contract.
             *
             * A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms.html) is needed to be broadcast in order to change the state.
             *
             * Internally, `write` uses a [Wallet Client](https://viem.sh/docs/clients/wallet.html) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction.html) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData.html).
             *
             * __Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract.html#usage) before you execute it.__
             *
             * @example
             * import { createWalletClient, getContract, http, parseAbi } from 'viem'
             * import { mainnet } from 'viem/chains'
             *
             * const walletClient = createWalletClient({
             *   chain: mainnet,
             *   transport: http(),
             * })
             * const contract = getContract({
             *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
             *   abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
             *   walletClient,
             * })
             * const hash = await contract.write.min([69420], {
             *   address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
             * })
             */
            write: {
              [FunctionName in _WriteFunctionNames]: GetWriteFunction<
                _Narrowable,
                TWalletClient["chain"],
                TWalletClient["account"],
                TAbi,
                FunctionName
              >;
            };
          }
      : unknown)
> & { address: TAddress; abi: TAbi };
type GetWriteFunction<
  Narrowable extends boolean,
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  Args = AbiParametersToPrimitiveTypes<TAbiFunction["inputs"]>,
  // For making `options` parameter required if `TAccount` or `TChain` is undefined
  IsOptionsRequired = Or<[IsUndefined<TAccount>, IsUndefined<TChain>]>
> = Narrowable extends true
  ? <
      TChainOverride extends Chain | undefined,
      Options extends Prettify<
        UnionOmit<
          WriteParamsRs<TAbi, TFunctionName, TChain, TAccount, TChainOverride>,
          "abi" | "address" | "args" | "functionName"
        >
      >
    >(
      ...parameters: Args extends readonly []
        ? IsOptionsRequired extends true
          ? [options: Options]
          : [options?: Options]
        : [
            args: Args,
            ...parameters: IsOptionsRequired extends true
              ? [options: Options]
              : [options?: Options]
          ]
    ) => Promise<WriteContractReturnType>
  : <
      TChainOverride extends Chain | undefined,
      Options extends Prettify<
        UnionOmit<
          WriteContractParameters<
            TAbi,
            TFunctionName,
            TChain,
            TAccount,
            TChainOverride
          >,
          "abi" | "address" | "args" | "functionName"
        >
      >,
      Rest extends unknown[] = IsOptionsRequired extends true
        ? [options: Options]
        : [options?: Options]
    >(
      ...parameters: Rest | [args: readonly unknown[], ...parameters: Rest]
    ) => Promise<WriteContractReturnType>;

type GetEstimateFunction<
  Narrowable extends boolean,
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  Args = AbiParametersToPrimitiveTypes<TAbiFunction["inputs"]>,
  Options = Prettify<
    UnionOmit<
      EstimateContractGasParamsRs<TAbi, TFunctionName, TChain, TAccount>,
      "abi" | "address" | "args" | "functionName"
    >
  >,
  // For making `options` parameter required if `TAccount`
  IsOptionsRequired = IsUndefined<TAccount>
> = Narrowable extends true
  ? (
      ...parameters: Args extends readonly []
        ? IsOptionsRequired extends true
          ? [options: Options]
          : [options?: Options]
        : [
            args: Args,
            ...parameters: IsOptionsRequired extends true
              ? [options: Options]
              : [options?: Options]
          ]
    ) => Promise<EstimateContractGasReturnType>
  : (
      ...parameters:
        | (IsOptionsRequired extends true
            ? [options: Options]
            : [options?: Options])
        | [
            args: readonly unknown[],
            ...parameters: IsOptionsRequired extends true
              ? [options: Options]
              : [options?: Options]
          ]
    ) => Promise<EstimateContractGasReturnType>;

type GetSimulateFunction<
  Narrowable extends boolean,
  TChain extends Chain | undefined,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  Args = AbiParametersToPrimitiveTypes<TAbiFunction["inputs"]>
> = Narrowable extends true
  ? <
      TChainOverride extends Chain | undefined,
      Options extends Prettify<
        UnionOmit<
          SimulateContractParametersRs<
            TAbi,
            TFunctionName,
            TChain,
            TChainOverride
          >,
          "abi" | "address" | "args" | "functionName"
        >
      >
    >(
      ...parameters: Args extends readonly []
        ? [options?: Options]
        : [args: Args, options?: Options]
    ) => Promise<
      SimulateContractReturnType<TAbi, TFunctionName, TChain, TChainOverride>
    >
  : <
      TChainOverride extends Chain | undefined,
      Options extends Prettify<
        UnionOmit<
          SimulateContractParametersRs<
            TAbi,
            TFunctionName,
            TChain,
            TChainOverride
          >,
          "abi" | "address" | "args" | "functionName"
        >
      >
    >(
      ...parameters:
        | [options?: Options]
        | [args: readonly unknown[], options?: Options]
    ) => Promise<SimulateContractReturnType>;

type GetReadFunction<
  Narrowable extends boolean,
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  Args = AbiParametersToPrimitiveTypes<TAbiFunction["inputs"]>,
  Options = Prettify<
    UnionOmit<
      RsReadParams<TAbi, TFunctionName>,
      "abi" | "address" | "args" | "functionName"
    >
  >
> = Narrowable extends true
  ? (
      ...parameters: Args extends readonly []
        ? [options?: Options]
        : [args: Args, options?: Options]
    ) => Promise<ReadContractReturnType<TAbi, TFunctionName>>
  : (
      ...parameters:
        | [options?: Options]
        | [args: readonly unknown[], options?: Options]
    ) => Promise<ReadContractReturnType>;

type GetWatchEvent<
  Narrowable extends boolean,
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  Args = AbiEventParametersToPrimitiveTypes<TAbiEvent["inputs"]>,
  Options = Prettify<
    Omit<
      WatchContractEventParameters<TAbi, TEventName>,
      "abi" | "address" | "args" | "eventName"
    >
  >,
  IndexedInputs = Extract<TAbiEvent["inputs"][number], { indexed: true }>
> = Narrowable extends true
  ? (
      ...parameters: IsNever<IndexedInputs> extends true
        ? [options: Options]
        : [args: Args, options: Options]
    ) => WatchContractEventReturnType
  : (
      ...parameters:
        | [options?: Options]
        | [
            args: readonly unknown[] | WatchContractEventOptions,
            options?: Options
          ]
    ) => WatchContractEventReturnType;
type GetEventFilter<
  Narrowable extends boolean,
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TAbiEvent extends AbiEvent = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent,
  Args = AbiEventParametersToPrimitiveTypes<TAbiEvent["inputs"]>,
  Options = Prettify<
    Omit<
      CreateContractEventFilterParameters<TAbi, TEventName>,
      "abi" | "address" | "args" | "eventName" | "strict"
    >
  >,
  IndexedInputs = Extract<TAbiEvent["inputs"][number], { indexed: true }>
> = Narrowable extends true
  ? <
      TArgs extends MaybeExtractEventArgsFromAbi<TAbi, TEventName> | undefined,
      TStrict extends boolean | undefined = undefined
    >(
      ...parameters: IsNever<IndexedInputs> extends true
        ? [options?: Options & { strict?: TStrict }]
        : [
            args: Args | (Args extends Narrow<TArgs> ? Narrow<TArgs> : never),
            options?: Options & { strict?: TStrict }
          ]
    ) => Promise<
      CreateContractEventFilterReturnType<TAbi, TEventName, TArgs, TStrict>
    >
  : <TStrict extends boolean | undefined = undefined>(
      ...parameters:
        | [options?: Options & { strict?: TStrict }]
        | [
            args: readonly unknown[] | CreateContractFilterOptions,
            options?: Options & { strict?: TStrict }
          ]
    ) => Promise<CreateContractEventFilterReturnType>;
type CreateContractFilterOptions =
  RemoveProperties<CreateContractEventFilterParameters>;
type WatchContractEventOptions = RemoveProperties<WatchContractEventParameters>;

type RemoveProperties<T extends object> = Prettify<
  {
    [key: string]: unknown;
  } & {
    [_ in keyof T]?: never;
  }
>;

export type SimulateContractParametersRs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = any,
  TChain extends Chain | undefined = Chain | undefined,
  TChainOverride extends Chain | undefined = undefined
> = {
  chain?: TChainOverride;
  /** Data to append to the end of the calldata. Useful for adding a ["domain" tag](https://opensea.notion.site/opensea/Seaport-Order-Attributions-ec2d69bf455041a5baa490941aad307f). */
  dataSuffix?: Hex;
  dataFeeds?: string[];
  mockDataFeedValues?: number[];
} & ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
  UnionOmit<
    CallParameters<TChainOverride extends Chain ? TChainOverride : TChain>,
    "batch" | "to" | "data" | "value"
  > &
  GetValue<
    TAbi,
    TFunctionName,
    CallParameters<TChain> extends CallParameters
      ? CallParameters<TChain>["value"]
      : CallParameters["value"]
  >;