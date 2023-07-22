import * as secp from "@noble/secp256k1";
import { webcrypto } from "crypto";

import { toBytes } from "viem";
import {
  DEFAULT_TIMESTAMP_FOR_TESTS,
  MAX_MOCK_SIGNERS_COUNT,
  MOCK_PRIVATE_KEYS,
} from "./mocks.ts";
import {
  DataPackagesRequestParams,
  SignedDataPackage,
  type SimpleNumericMockConfig,
} from "./types.ts";
import {
  getDataPackageHash,
  getMockHash,
  requestPayload,
  requestPayloadHash,
} from "./utils.ts";
// @ts-expect-error
if (!globalThis.crypto) globalThis.crypto = webcrypto;

export type DataPackageRequestParams = Omit<
  DataPackagesRequestParams,
  "dataFeeds"
> & { mock?: boolean };

export class RedstoneBase {
  public dataServiceId: string;
  public uniqueSignersCount: number;
  public urls: string[];
  public mock?: boolean;

  constructor(config: DataPackageRequestParams) {
    this.dataServiceId = config.dataServiceId;
    this.uniqueSignersCount = config.uniqueSignersCount;
    this.urls = config.urls;
    this.mock = config.mock;
  }

  public requestRedstonePayload = async (feeds: string[]) => {
    return requestPayloadHash({
      dataServiceId: this.dataServiceId,
      uniqueSignersCount: this.uniqueSignersCount,
      dataFeeds: feeds,
      urls: this.urls,
    });
  };

  public getDataPackage = async (feeds: string[]) => {
    return requestPayload({
      dataServiceId: this.dataServiceId,
      uniqueSignersCount: this.uniqueSignersCount,
      dataFeeds: feeds,
      urls: this.urls,
    });
  };
  public getPrices = async (feeds: string[]) => {
    const packages = await this.getDataPackage(feeds);
    return feeds.map((feed) => ({
      feed,
      price: packages[feed][0].dataPoints[0].value,
    }));
  };
}

export class RedstoneHelper extends RedstoneBase {
  public getPayload = async (feeds: string[], values?: number[]) => {
    return this.mock || (values && values.length)
      ? RedstoneHelper.getSimpleNumericMockPayload({
          mockSignersCount: 1,
          timestampMilliseconds: Date.now(),
          dataPoints: feeds.map((dataFeedId, i) => ({
            dataFeedId,
            value: values ? values[i] : 0,
          })),
        })
      : this.requestRedstonePayload(feeds);
  };

  public static getSimpleNumericMockPayload = async (
    config: SimpleNumericMockConfig
  ) => {
    if (config.mockSignersCount > MAX_MOCK_SIGNERS_COUNT) {
      throw new Error(
        `mockSignersCount should be <= ${MAX_MOCK_SIGNERS_COUNT}`
      );
    }

    let signedPackages: { [dataFeedId: string]: SignedDataPackage[] } = {};
    for (
      let signerIndex = 0;
      signerIndex < config.mockSignersCount;
      signerIndex++
    ) {
      for (const dataPointObj of config.dataPoints) {
        const dataPackage = {
          dataPoints: [dataPointObj],
          timestampMilliseconds:
            config.timestampMilliseconds || DEFAULT_TIMESTAMP_FOR_TESTS,
        };
        const digestBytes = getDataPackageHash(dataPackage);
        const signed = await secp.signAsync(
          digestBytes,
          toBytes(MOCK_PRIVATE_KEYS[signerIndex]),
          {
            lowS: true,
          }
        );
        const signature = `${signed.toCompactHex()}${
          signed.recovery ? "1c" : "1b"
        }`;

        signedPackages[dataPointObj.dataFeedId] = [
          {
            ...dataPackage,
            signature: Buffer.from(signature, "hex").toString("base64"),
          },
        ];
      }
    }

    return getMockHash(
      signedPackages,
      {
        dataServiceId: "",
        dataFeeds: config.dataPoints.map((dp) => dp.dataFeedId),
        uniqueSignersCount: config.mockSignersCount,
      },
      "kresko-redstone-viem#simple-numeric-mock"
    );
  };
}
