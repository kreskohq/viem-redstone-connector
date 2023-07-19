import { http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { arbitrumGoerli } from "viem/chains";
import { MNEMONIC_TESTNET } from "../env.ts";
import { getContract } from "../extensions.ts";
import { getPublicClientRs, getWalletClientRs } from "../index.ts";
import { Kresko } from "../utils/kresko.ts";
import { demoDataServiceConfig } from "../utils/mocks.ts";

const publicClient = getPublicClientRs(
  {
    chain: arbitrumGoerli,
    transport: http(),
  },
  { ...demoDataServiceConfig },
  ["DAI", "ETH", "USDC"]
);

const walletClient = getWalletClientRs(
  {
    chain: arbitrumGoerli,
    transport: http(),
    account: mnemonicToAccount(MNEMONIC_TESTNET, { accountIndex: 0 }),
  },
  { ...demoDataServiceConfig }
);
const run = async () => {
  const contract = getContract({
    abi: Kresko.abi,
    address: Kresko.address,
    walletClient: walletClient,
    publicClient: publicClient,
  });

  const prices = await publicClient.rsPrices(["DAI", "ETH", "BTC", "USDf"]);
  console.assert(prices.length === 4, "prices: length is not 4");
  const readResultContract = await contract.read.getAccountCollateralValue([
    walletClient.account.address,
  ]);

  console.assert(readResultContract > 0n, "read: value is not > 0");

  const readResult = await publicClient.rsRead({
    abi: Kresko.abi,
    functionName: "getAccountCollateralValue",
    args: [walletClient.account.address],
    address: Kresko.address,
  });

  console.assert(readResult > 0n, "read: value is not > 0");

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

  console.assert(writeGasEstimate > 0n, "estimate: value is not > 0");

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

  console.assert(simulateResult.result === undefined, "simulate: fail");

  const withdrawResult = await walletClient.rsWrite({
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
  console.assert(!!withdrawResult, "write: fail");

  const mintResult = await walletClient.rsWrite({
    abi: Kresko.abi,
    functionName: "mintKreskoAsset",
    args: [
      walletClient.account.address,
      "0x8520C6452fc3ce680Bd1635D5B994cCE6b36D3Be",
      1000n,
    ],
    address: Kresko.address,
    dataFeeds: ["BTC", "ETH", "DAI", "USDf"],
  });
  console.assert(!!mintResult, "write: fail");
};

run()
  .then(() => console.info("Tests success!"))
  .catch(console.error);
