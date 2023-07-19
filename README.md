## Viem Redstone Wrapper

This library exports extended [Public Client](https://viem.sh/docs/clients/public.html), [Wallet Client](https://viem.sh/docs/clients/wallet.html) and [getContract](https://viem.sh/docs/contract/getContract.html) for [viem](https://viem.sh/docs/getting-started.html).

The extensions contain [Redstone](https://docs.redstone.finance/docs/smart-contract-devs/get-started/redstone-core) integrations for contract reads and writes.

#### Public Client extensions methods:

- `rsRead` for calling read functions.
- `rsSimulate` for transaction simulation.
- `rsEstimateGas` for transaction gas estimation.
- `rsDataPackages` for data package response.
- `rsPrices` for easy access to current data package values.
- `dataFeeds` for current enabled data feeds.

#### Wallet Client extensions methods:

- `rsWrite` for calling write functions.
- `rsEstimateGas` for transaction gas estimation.
- `rsDataPackages` for raw data packages response.
- `rsPrices` retrieve data package values (prices).
- `dataFeeds` for current enabled data feeds.

#### getContract extensions

- [getContract](https://viem.sh/docs/contract/getContract.html) read/write/simulate/estimateGas methods are overridden with above.

## How to

### Setup

Install the package from npm

```sh
pnpm i @kreskolabs/viem-redstone-connector
```

Setup your data service configuration when creating `WalletClient` and/or `PublicClient`:

```typescript
import {
  getPublicClientRs,
  getWalletClientRs,
} from "@kreskolabs/viem-redstone-connector";
import { arbitrumGoerli } from "viem/chains";
import { MNEMONIC_TESTNET } from "../env.ts";

// Redstone Demo Data Service
const dataServiceConfig = {
  dataServiceId: "redstone-main-demo",
  uniqueSignersCount: 1,
  urls: ["https://d33trozg86ya9x.cloudfront.net"],
};

// These can be overridden per Contract and Function.
const dataFeeds = ["DAI", "ETH", "USDC"];

const publicClient = getPublicClientRs(
  {
    chain: arbitrumGoerli,
    transport: http(),
  },
  dataServicesConfig,
  dataFeeds // optional
);

const walletClient = getWalletClientRs(
  {
    chain: arbitrumGoerli,
    transport: http(),
    account: mnemonicToAccount(MNEMONIC_TESTNET),
  },
  dataServicesConfig,
  dataFeeds // optional
);
```

### Use with PublicClient

#### Reading Contracts

```typescript
const ABI = [
  "function getAccountCollateralValue(address user) view returns (uint256)",
] as const; // Type inference in viem requires `as const`

const collateralValue = await publicClient.rsRead({
  abi: ABI,
  functionName: "getAccountCollateralValue",
  args: ["0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d"],
  address: "0x0921a7234a2762aaB3C43d3b1F51dB5D8094a04b",
  dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // This is optional, you can specify these on PublicClient level in setup
});

console.assert(collateralValue > 0n, "value should be > 0");
```

#### Reading Contracts with Mock Numeric Values

```typescript
const ABI = [
  "function getAccountCollateralValue(address user) view returns (uint256)",
] as const;

const collateralValue = await publicClient.rsRead({
  abi: ABI,
  functionName: "getAccountCollateralValue",
  args: ["0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d"],
  address: "0x0921a7234a2762aaB3C43d3b1F51dB5D8094a04b",
  dataFeeds: ["DAI", "USDf", "ETH", "BTC"],
  mockDataFeedValues: [0, 0, 0, 0], // NOTE: This enables the mock payload generation (instead of fetching from data service).
});

console.assert(collateralValue > 0n, "value should be > 0"); // In this example, the target contract still uses secondary oracle if Redstone price is 0.
```

### Use with WalletClient

#### Write to Contracts

```typescript
const ABI = [
  "function mintKreskoAsset(address account, address asset, uint256 amount)",
] as const;

const txHash = await walletClient.rsWrite({
  abi: ABI,
  functionName: "mintKreskoAsset",
  args: [
    walletClient.account.address,
    "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
    1000n,
  ],
  address: "0x0921a7234a2762aaB3C43d3b1F51dB5D8094a04b",
  dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // This is optional, you can specify these on WalletClient level in setup
});

console.assert(!!txHash);
```

#### Write to Contracts with Mock Numeric Values

```typescript
const ABI = [
  "function mintKreskoAsset(address account, address asset, uint256 amount)",
] as const;

const txHash = await walletClient.rsWrite({
  abi: ABI,
  functionName: "mintKreskoAsset",
  args: [
    walletClient.account.address,
    "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
    1000n,
  ],
  address: "0x0921a7234a2762aaB3C43d3b1F51dB5D8094a04b",
  dataFeeds: ["DAI", "USDf", "ETH", "BTC"],
  mockDataFeedValues: [0, 0, 0, 0], // NOTE: This enables the mock payload generation (instead of fetching from data service).
});

console.assert(!!txHash);
```

### Use with getContract

#### Setup

```typescript
import { getContract } from "@kreskolabs/viem-redstone-connector";

...

const ABI = [
  "function mintKreskoAsset(address account, address asset, uint256 amount)",
  "function getAccountCollateralValue(address user) view returns (uint256)",
] as const;

const contract = getContract({
  abi: ABI,
  address: "0x0921a7234a2762aaB3C43d3b1F51dB5D8094a04b",
  publicClient, // Enables `rsRead`, `rsSimulate`, `rsEstimateGas` overrides on the contract.
  walletClient, // Enables `rsWrite`, `rsEstimateGas` overrides on the contract.
  dataFeeds: ["DAI", "USDf"], // Optional. Overrides Client level dataFeeds set.
  /* mockDataFeedValues: [1,1] */ // for mocked numeric values
});
```

#### Usage

```typescript
/// Read
const collateralValue = await contract.read.getAccountCollateralValue(
  ["0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d"],
  {
    dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // Optional override.
    /* mockDataFeedValues: [1,1,1900,30500] */ // for mocked numeric values
  }
);

console.assert(collateralValue > 0n, "value should be > 0 ");

/// Write
const txHash = await contract.write.mintKreskoasset(
  [
    "0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d",
    "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
    1000n,
  ],
  {
    dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // Optional override.
    /* mockDataFeedValues: [1,1,1900,30500] */ // for mocked numeric values
  }
);

console.assert(!!txHash);

/// Estimage Gas
const gasEstimate = await contract.estimateGas.mintKreskoasset(
  [
    "0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d",
    "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
    1000n,
  ],
  {
    dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // Optional override.
    /* mockDataFeedValues: [1,1,1900,30500] */ // for mocked numeric values
  }
);

console.assert(gasEstimate > 0n, "gas estimate should be > 0");

/// Simulate Transaction
const simulateResult = await contract.simulate.mintKreskoasset(
  [
    "0xB48bB6b68Ab4D366B4f9A30eE6f7Ee55125c2D9d",
    "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
    1000n,
  ],
  {
    dataFeeds: ["DAI", "USDf", "ETH", "BTC"], // Optional override.
    /* mockDataFeedValues: [1,1,1900,30500] */ // for mocked numeric values
  }
);

console.assert(!!simulateResult);
```
