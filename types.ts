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
  Abi,
  Address,
  CallParameters,
  Chain,
  CreateContractEventFilterParameters,
  EstimateContractGasReturnType,
  EstimateGasParameters,
  FormattedTransactionRequest,
  Narrow,
  PublicClient,
  ReadContractParameters,
  ReadContractReturnType,
  SendTransactionParameters,
  SimulateContractReturnType,
  WalletClient,
  WatchContractEventParameters,
  WatchContractEventReturnType,
  WriteContractParameters,
  WriteContractReturnType,
  Account,
} from "viem";

export type RsReadParams<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string | undefined = undefined
> = ReadContractParameters<TAbi, TFunctionName> & {
  dataFeeds?: string[];
  mockDataFeedValues?: number[];
};

export type GetAccountParameter<
  TAccount extends Account | undefined = Account | undefined
> = TAccount extends undefined
  ? { account: Account | Address }
  : { account?: Account | Address };

export type GetChain<
  chain extends Chain | undefined,
  chainOverride extends Chain | undefined = undefined
> = chain extends undefined
  ? { chain: chainOverride | null }
  : { chain?: chainOverride | null };
export type WriteParamsRs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TChain extends Chain | undefined = Chain,
  TAccount extends Account | undefined = Account | undefined,
  TChainOverride extends Chain | undefined = Chain | undefined
> = ContractFunctionConfig<TAbi, TFunctionName, "payable" | "nonpayable"> &
  GetAccountParameter<TAccount> &
  GetChain<TChain, TChainOverride> &
  UnionOmit<
    FormattedTransactionRequest<
      TChainOverride extends Chain ? TChainOverride : TChain
    >,
    "from" | "to" | "data" | "value"
  > &
  GetValue<
    TAbi,
    TFunctionName,
    SendTransactionParameters<
      TChain,
      Account,
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

import type {
  AbiConstructor,
  AbiError,
  AbiParameter,
  AbiParameterToPrimitiveType,
  AbiStateMutability,
  ExtractAbiError,
  ExtractAbiErrorNames,
} from "abitype";
import {
  BlockNumber,
  BlockTag,
  EIP1193RequestFn,
  TransactionRequest,
  PublicRpcSchema,
} from "viem";

export type AbiItem = Abi[number];

export type EventDefinition = `${string}(${string})`;

export type ContractFunctionConfig<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability
> = {
  /** Contract ABI */
  abi: Narrow<TAbi>;
  /** Contract address */
  address: Address;
  /** Function to invoke on the contract */
  functionName: InferFunctionName<TAbi, TFunctionName, TAbiStateMutability>;
} & GetFunctionArgs<TAbi, TFunctionName>;

export type ContractFunctionResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string = string,
  TAbiFunction extends AbiFunction & {
    type: "function";
  } = TAbi extends Abi ? ExtractAbiFunction<TAbi, TFunctionName> : AbiFunction,
  TArgs = AbiParametersToPrimitiveTypes<TAbiFunction["outputs"]>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false)
> = true extends FailedToParseArgs
  ? unknown
  : TArgs extends readonly []
  ? void
  : TArgs extends readonly [infer Arg]
  ? Arg
  : TArgs;

export type GetValue<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TValueType = TransactionRequest["value"],
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  _Narrowable extends boolean = IsNarrowable<TAbi, Abi>
> = _Narrowable extends true
  ? TAbiFunction["stateMutability"] extends "payable"
    ? { value?: NoUndefined<TValueType> }
    : TAbiFunction["payable"] extends true
    ? { value?: NoUndefined<TValueType> }
    : { value?: never }
  : { value?: TValueType };

export type MaybeAbiEventName<TAbiEvent extends AbiEvent | undefined> =
  TAbiEvent extends AbiEvent ? TAbiEvent["name"] : undefined;

export type MaybeExtractEventArgsFromAbi<
  TAbi extends Abi | readonly unknown[] | undefined,
  TEventName extends string | undefined
> = TAbi extends Abi | readonly unknown[]
  ? TEventName extends string
    ? GetEventArgs<TAbi, TEventName>
    : undefined
  : undefined;

//////////////////////////////////////////////////////////////////////
// ABI item name

export type InferErrorName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TErrorName extends string | undefined = string
> = TAbi extends Abi
  ? ExtractAbiErrorNames<TAbi> extends infer AbiErrorNames
    ?
        | AbiErrorNames
        | (TErrorName extends AbiErrorNames ? TErrorName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TErrorName;

export type InferEventName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = string
> = TAbi extends Abi
  ? ExtractAbiEventNames<TAbi> extends infer AbiEventNames
    ? AbiEventNames | (TEventName extends AbiEventNames ? TEventName : never)
    : never
  : TEventName;

export type InferFunctionName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TFunctionName extends string | undefined = string,
  TAbiStateMutability extends AbiStateMutability = AbiStateMutability
> = TAbi extends Abi
  ? ExtractAbiFunctionNames<
      TAbi,
      TAbiStateMutability
    > extends infer AbiFunctionNames
    ?
        | AbiFunctionNames
        | (TFunctionName extends AbiFunctionNames ? TFunctionName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TFunctionName;

export type InferItemName<
  TAbi extends Abi | readonly unknown[] = Abi,
  TName extends string = string
> = TAbi extends Abi
  ? ExtractAbiItemNames<TAbi> extends infer AbiNames
    ?
        | AbiNames
        | (TName extends AbiNames ? TName : never)
        | (Abi extends TAbi ? string : never)
    : never
  : TName;
type ExtractAbiItemNames<TAbi extends Abi> =
  | ExtractAbiFunctionNames<TAbi>
  | ExtractAbiEventNames<TAbi>
  | ExtractAbiErrorNames<TAbi>;

//////////////////////////////////////////////////////////////////////
// ABI item args

export type GetFunctionArgs<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TAbiFunction extends AbiFunction = TAbi extends Abi
    ? ExtractAbiFunction<TAbi, TFunctionName>
    : AbiFunction,
  TArgs = AbiParametersToPrimitiveTypes<TAbiFunction["inputs"]>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false)
> = true extends FailedToParseArgs
  ? {
      /**
       * Arguments to pass contract method
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      args?: readonly unknown[];
    }
  : TArgs extends readonly []
  ? { args?: never }
  : {
      /** Arguments to pass contract method */ args: TArgs;
    };

export type RootFilter<
  T extends readonly unknown[],
  P,
  Acc extends readonly unknown[] = []
> = T extends readonly [infer F, ...infer Rest extends readonly unknown[]]
  ? [F] extends [P]
    ? Filter<Rest, P, [...Acc, F]>
    : Filter<Rest, P, Acc>
  : readonly [...Acc];
type FilterRpcSchema = RootFilter<
  PublicRpcSchema,
  {
    Method:
      | "eth_getFilterLogs"
      | "eth_getFilterChanges"
      | "eth_uninstallFilter";
  }
>;

export type GetConstructorArgs<
  TAbi extends Abi | readonly unknown[],
  TAbiConstructor extends AbiConstructor = TAbi extends Abi
    ? Extract<TAbi[number], { type: "constructor" }>
    : AbiConstructor,
  TArgs = AbiParametersToPrimitiveTypes<TAbiConstructor["inputs"]>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false)
> = true extends FailedToParseArgs
  ? {
      /**
       * Arguments to pass contract constructor
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      args?: readonly unknown[];
    }
  : TArgs extends readonly []
  ? { args?: never }
  : {
      /** Arguments to pass contract constructor */ args: TArgs;
    };

export type GetErrorArgs<
  TAbi extends Abi | readonly unknown[],
  TErrorName extends string,
  TAbiError extends AbiError = TAbi extends Abi
    ? ExtractAbiError<TAbi, TErrorName>
    : AbiError,
  TArgs = AbiParametersToPrimitiveTypes<TAbiError["inputs"]>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false)
> = true extends FailedToParseArgs
  ? {
      /**
       * Arguments to pass contract method
       *
       * Use a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) on {@link abi} for type inference.
       */
      args?: readonly unknown[];
    }
  : TArgs extends readonly []
  ? { args?: never }
  : {
      /** Arguments to pass contract method */ args: TArgs;
    };

export type BaseFilter<
  TFilterType extends FilterType = "event",
  TAbi extends Abi | readonly unknown[] | undefined = undefined,
  TEventName extends string | undefined = undefined,
  TArgs extends
    | MaybeExtractEventArgsFromAbi<TAbi, TEventName>
    | undefined = MaybeExtractEventArgsFromAbi<TAbi, TEventName>,
  TStrict extends boolean | undefined = undefined,
  TFromBlock extends BlockNumber | BlockTag | undefined = undefined,
  TToBlock extends BlockNumber | BlockTag | undefined = undefined
> = {
  id: Hex;
  request: EIP1193RequestFn<FilterRpcSchema>;
  type: TFilterType;
} & (TFilterType extends "event"
  ? {
      fromBlock?: TFromBlock;
      toBlock?: TToBlock;
    } & (TAbi extends Abi
      ? undefined extends TEventName
        ? {
            abi: TAbi;
            args?: never;
            eventName?: never;
            strict: TStrict;
          }
        : TArgs extends MaybeExtractEventArgsFromAbi<TAbi, TEventName>
        ? {
            abi: TAbi;
            args: TArgs;
            eventName: TEventName;
            strict: TStrict;
          }
        : {
            abi: TAbi;
            args?: never;
            eventName: TEventName;
            strict: TStrict;
          }
      : {
          abi?: never;
          args?: never;
          eventName?: never;
          strict?: never;
        })
  : {});

export type CreateContractEventFilterReturnType<
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = string | undefined,
  TArgs extends MaybeExtractEventArgsFromAbi<TAbi, TEventName> | undefined =
    | MaybeExtractEventArgsFromAbi<TAbi, TEventName>
    | undefined,
  TStrict extends boolean | undefined = undefined,
  TFromBlock extends BlockNumber | BlockTag | undefined = undefined,
  TToBlock extends BlockNumber | BlockTag | undefined = undefined
> = BaseFilter<"event", TAbi, TEventName, TArgs, TStrict, TFromBlock, TToBlock>;

export type GetEventArgs<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TConfig extends EventParameterOptions = DefaultEventParameterOptions,
  TAbiEvent extends AbiEvent & { type: "event" } = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent & { type: "event" },
  TArgs = AbiEventParametersToPrimitiveTypes<TAbiEvent["inputs"], TConfig>,
  FailedToParseArgs =
    | ([TArgs] extends [never] ? true : false)
    | (readonly unknown[] extends TArgs ? true : false)
> = true extends FailedToParseArgs
  ? readonly unknown[] | Record<string, unknown>
  : TArgs;

export type GetEventArgsFromTopics<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
  TTopics extends LogTopic[],
  TData extends Hex | undefined,
  TStrict extends boolean = true,
  TAbiEvent extends AbiEvent & { type: "event" } = TAbi extends Abi
    ? ExtractAbiEvent<TAbi, TEventName>
    : AbiEvent & { type: "event" },
  TArgs = AbiEventParametersToPrimitiveTypes<
    TAbiEvent["inputs"],
    { EnableUnion: false; IndexedOnly: false; Required: TStrict }
  >
> = TTopics extends readonly []
  ? TData extends undefined
    ? { args?: never }
    : { args?: TArgs }
  : { args: TArgs };

//////////////////////////////////////////////////////////////////////
// ABI event types

type EventParameterOptions = {
  EnableUnion?: boolean;
  IndexedOnly?: boolean;
  Required?: boolean;
};
type DefaultEventParameterOptions = {
  EnableUnion: true;
  IndexedOnly: true;
  Required: false;
};

type HashedEventTypes = "bytes" | "string" | "tuple" | `${string}[${string}]`;

// TODO: Speed up by returning immediately as soon as named parameter is found.
type _HasUnnamedAbiParameter<TAbiParameters extends readonly AbiParameter[]> =
  TAbiParameters extends readonly [
    infer Head extends AbiParameter,
    ...infer Tail extends readonly AbiParameter[]
  ]
    ? Head extends { name: string }
      ? Head["name"] extends ""
        ? true
        : _HasUnnamedAbiParameter<Tail>
      : true
    : false;

/**
 * @internal
 */
export type LogTopicType<
  TPrimitiveType = Hex,
  TTopic extends LogTopic = LogTopic
> = TTopic extends Hex
  ? TPrimitiveType
  : TTopic extends Hex[]
  ? TPrimitiveType[]
  : TTopic extends null
  ? null
  : never;

/**
 * @internal
 */
export type AbiEventParameterToPrimitiveType<
  TAbiParameter extends AbiParameter,
  Options extends EventParameterOptions = DefaultEventParameterOptions,
  _Type = AbiParameterToPrimitiveType<TAbiParameter>
> = Options["EnableUnion"] extends true ? LogTopicType<_Type> : _Type;

/**
 * @internal
 */
export type AbiEventTopicToPrimitiveType<
  TAbiParameter extends AbiParameter,
  TTopic extends LogTopic,
  TPrimitiveType = TAbiParameter["type"] extends HashedEventTypes
    ? TTopic
    : AbiParameterToPrimitiveType<TAbiParameter>
> = LogTopicType<TPrimitiveType, TTopic>;

export type AbiEventParametersToPrimitiveTypes<
  TAbiParameters extends readonly AbiParameter[],
  Options extends EventParameterOptions = DefaultEventParameterOptions
  // Remove non-indexed parameters based on `Options['IndexedOnly']`
> = TAbiParameters extends readonly []
  ? readonly []
  : Filter<
      TAbiParameters,
      Options["IndexedOnly"] extends true ? { indexed: true } : object
    > extends infer Filtered extends readonly AbiParameter[]
  ? _HasUnnamedAbiParameter<Filtered> extends true
    ? // Has unnamed tuple parameters so return as array
      | readonly [
            ...{
              [K in keyof Filtered]: AbiEventParameterToPrimitiveType<
                Filtered[K],
                Options
              >;
            }
          ]
        // Distribute over tuple to represent optional parameters
        | (Options["Required"] extends true
            ? never
            : // Distribute over tuple to represent optional parameters
            Filtered extends readonly [
                ...infer Head extends readonly AbiParameter[],
                infer _
              ]
            ? AbiEventParametersToPrimitiveTypes<
                readonly [...{ [K in keyof Head]: Omit<Head[K], "name"> }],
                Options
              >
            : never)
    : // All tuple parameters are named so return as object
    {
        [Parameter in Filtered[number] as Parameter extends {
          name: infer Name extends string;
        }
          ? Name
          : never]?: AbiEventParameterToPrimitiveType<Parameter, Options>;
      } extends infer Mapped
    ? Prettify<
        MaybeRequired<
          Mapped,
          Options["Required"] extends boolean ? Options["Required"] : false
        >
      >
    : never
  : never;

import { Log } from "viem";

/**
 * Filters out all members of {@link T} that are not {@link P}
 *
 * @param T - Items to filter
 * @param P - Type to filter out
 * @returns Filtered items
 *
 * @example
 * type Result = Filter<['a', 'b', 'c'], 'b'>
 * //   ^? type Result = ['a', 'c']
 */
export type Filter<
  T extends readonly unknown[],
  P,
  Acc extends readonly unknown[] = []
> = T extends readonly [infer F, ...infer Rest extends readonly unknown[]]
  ? [F] extends [P]
    ? Filter<Rest, P, [...Acc, F]>
    : Filter<Rest, P, Acc>
  : readonly [...Acc];

/**
 * @description Checks if {@link T} can be narrowed further than {@link U}
 * @param T - Type to check
 * @param U - Type to against
 * @example
 * type Result = IsNarrowable<'foo', string>
 * //   ^? true
 */
export type IsNarrowable<T, U> = IsNever<
  (T extends U ? true : false) & (U extends T ? false : true)
> extends true
  ? false
  : true;

/**
 * @description Checks if {@link T} is `never`
 * @param T - Type to check
 * @example
 * type Result = IsNever<never>
 * //   ^? type Result = true
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * @description Evaluates boolean "or" condition for {@link T} properties.
 * @param T - Type to check
 *
 * * @example
 * type Result = Or<[false, true, false]>
 * //   ^? type Result = true
 *
 * @example
 * type Result = Or<[false, false, false]>
 * //   ^? type Result = false
 */
export type Or<T extends readonly unknown[]> = T extends readonly [
  infer Head,
  ...infer Tail
]
  ? Head extends true
    ? true
    : Or<Tail>
  : false;

/**
 * @description Checks if {@link T} is `undefined`
 * @param T - Type to check
 * @example
 * type Result = IsUndefined<undefined>
 * //   ^? type Result = true
 */
export type IsUndefined<T> = [undefined] extends [T] ? true : false;

/**
 * Excludes empty attributes from T if TMaybeExclude is true.
 *
 * @example
 * type Result = MaybeExcludeEmpty<{ a: string, b: number, c: [] }, true>
 * //   ^? type Result = { a: string, b: number }
 * @example
 * type Result = MaybeExcludeEmpty<{ a: string, b: number, c: [] }, false>
 * //   ^? type Result = { a: string, b: number, c: [] }
 * @example
 * type Result = MaybeExcludeEmpty<{ a: string, b: number, c: undefined }, true>
 * //   ^? type Result = { a: string, b: number }
 */
export type MaybeExcludeEmpty<
  T,
  TMaybeExclude extends boolean
> = TMaybeExclude extends true ? Exclude<T, [] | null | undefined> : T;

export type MaybePromise<T> = T | Promise<T>;

/**
 * @description Makes attributes on the type T required if TRequired is true.
 *
 * @example
 * MaybeRequired<{ a: string, b?: number }, true>
 * => { a: string, b: number }
 *
 * MaybeRequired<{ a: string, b?: number }, false>
 * => { a: string, b?: number }
 */
export type MaybeRequired<T, TRequired extends boolean> = TRequired extends true
  ? Required<T>
  : T;

/**
 * @description Makes the attribute on the type T allow undefined if TUndefinedish is true.
 *
 * @example
 * MaybeUndefined<string, true>
 * => string | undefined
 *
 * MaybeUndefined<string, false>
 * => string
 */
export type MaybeUndefined<
  T,
  TUndefinedish extends boolean
> = TUndefinedish extends true ? T | undefined : T;

/**
 * @private Helper for `Assign`. This is a workaround for tsc generating errorneous type definitions.
 */
export type Assign_<T, U> = {
  [K in keyof T as K extends keyof U
    ? U[K] extends void
      ? never
      : K
    : K]: K extends keyof U ? U[K] : T[K];
};

/**
 * @description Assigns the properties of U onto T.
 *
 * @example
 * Assign<{ a: string, b: number }, { a: undefined, c: boolean }>
 * => { a: undefined, b: number, c: boolean }
 */
export type Assign<T, U> = Assign_<T, U> & U;

/**
 * @description Makes nullable properties from T optional.
 *
 * @example
 * OptionalNullable<{ a: string | undefined, c: number }>
 * => { a?: string | undefined, c: number }
 */
export type OptionalNullable<T> = {
  [K in keyof T as T[K] extends NonNullable<unknown> ? K : never]: T[K];
} & {
  [K in keyof T as T[K] extends NonNullable<unknown> ? never : K]?: T[K];
};

/**
 * @description Make properties K of type T never.
 *
 * @example
 * NeverBy<{ a: string, b: boolean, c: number }, 'a' | 'c'>
 * => { a: never, b: boolean, c: never }
 */
export type NeverBy<T, K extends keyof T> = {
  [U in keyof T]: U extends K ? never : T[U];
};

/**
 * @description Constructs a type by excluding `undefined` from `T`.
 *
 * @example
 * NoUndefined<string | undefined>
 * => string
 */
export type NoUndefined<T> = T extends undefined ? never : T;

/**
 * @description Construct a type with the properties of union type T except for those in type K.
 * @example
 * type Result = UnionOmit<{ a: string, b: number } | { a: string, b: undefined, c: number }, 'a'>
 * => { b: number } | { b: undefined, c: number }
 */
export type UnionOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

/**
 * @description Creates a type that is a partial of T, but with the required keys K.
 *
 * @example
 * PartialBy<{ a: string, b: number }, 'a'>
 * => { a?: string, b: number }
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * @description Combines members of an intersection into a readable type.
 *
 * @see {@link https://twitter.com/mattpocockuk/status/1622730173446557697?s=20&t=NdpAcmEFXY01xkqU3KO0Mg}
 * @example
 * Prettify<{ a: string } & { b: string } & { c: number, d: bigint }>
 * => { a: string, b: string, c: number, d: bigint }
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type TrimLeft<T, Chars extends string = " "> = T extends `${Chars}${infer R}`
  ? TrimLeft<R>
  : T;
type TrimRight<T, Chars extends string = " "> = T extends `${infer R}${Chars}`
  ? TrimRight<R>
  : T;

/**
 * @description Creates a type with required keys K from T.
 *
 * @example
 * type Result = RequiredBy<{ a?: string, b?: number, c: number }, 'a' | 'c'>
 * //   ^? { a: string, b?: number, c: number }
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * @description Trims empty space from type T.
 *
 * @example
 * Trim<'      lol  '>
 * => 'lol'
 */
export type Trim<T, Chars extends string = " "> = TrimLeft<
  TrimRight<T, Chars>,
  Chars
>;

/**
 * @description Creates a type that extracts the values of T.
 *
 * @example
 * ValueOf<{ a: string, b: number }>
 * => string | number
 */
export type ValueOf<T> = T[keyof T];

export type ByteArray = Uint8Array;
export type Hex = `0x${string}`;
export type Hash = `0x${string}`;
export type LogTopic = Hex | Hex[] | null;
export type SignableMessage =
  | string
  | {
      /** Raw data representation of the message. */
      raw: Hex | ByteArray;
    };
export type Signature = {
  // TODO(v2): Make `bigint`
  r: Hex;
  // TODO(v2): Make `bigint`
  s: Hex;
  // TODO(v2): `v` to `recovery`
  v: bigint;
};

export type FilterType = "transaction" | "block" | "event";

export type AccessList = { address: Address; storageKeys: Hex[] }[];

export type TransactionType = ValueOf<typeof transactionType> | (string & {});
export const transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
} as const;
export type TransactionReceipt<
  TQuantity = bigint,
  TIndex = number,
  TStatus = "success" | "reverted",
  TType = TransactionType
> = {
  /** Hash of block containing this transaction */
  blockHash: Hash;
  /** Number of block containing this transaction */
  blockNumber: TQuantity;
  /** Address of new contract or `null` if no contract was created */
  contractAddress: Address | null;
  /** Gas used by this and all preceding transactions in this block */
  cumulativeGasUsed: TQuantity;
  /** Pre-London, it is equal to the transaction's gasPrice. Post-London, it is equal to the actual gas price paid for inclusion. */
  effectiveGasPrice: TQuantity;
  /** Transaction sender */
  from: Address;
  /** Gas used by this transaction */
  gasUsed: TQuantity;
  /** List of log objects generated by this transaction */
  logs: Log<TQuantity, TIndex>[];
  /** Logs bloom filter */
  logsBloom: Hex;
  /** `success` if this transaction was successful or `reverted` if it failed */
  status: TStatus;
  /** Transaction recipient or `null` if deploying a contract */
  to: Address | null;
  /** Hash of this transaction */
  transactionHash: Hash;
  /** Index of this transaction in the block */
  transactionIndex: TIndex;
  /** Transaction type */
  type: TType;
};
