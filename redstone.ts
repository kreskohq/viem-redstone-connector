import {
  DataPackage,
  NumericDataPoint,
  RedstonePayload,
} from "redstone-protocol";
import sdk, { DataPackagesRequestParams } from "redstone-sdk";
import {
  type MockDataPackageConfig,
  type MockSignerIndex,
  type SimpleNumericMockConfig,
} from "./types.ts";
import {
  DEFAULT_TIMESTAMP_FOR_TESTS,
  MAX_MOCK_SIGNERS_COUNT,
  MOCK_PRIVATE_KEYS,
  getMockSignerAddress,
  getMockSignerPrivateKey,
} from "./utils/mocks.ts";

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
    return sdk.requestRedstonePayload({
      dataServiceId: this.dataServiceId,
      uniqueSignersCount: this.uniqueSignersCount,
      dataFeeds: feeds,
      urls: this.urls,
    });
  };

  public getDataPackage = async (feeds: string[]) => {
    return sdk.requestDataPackages({
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
      price: packages[feed][0].dataPackage.toObj().dataPoints[0].value,
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

  public static getSimpleMock = (
    feeds: { dataFeedId: string; value: number }[],
    timestampMilliseconds = Date.now()
  ) => {
    const datapoints = feeds.map(({ dataFeedId, value }) => {
      return new NumericDataPoint({
        dataFeedId,
        value,
        decimals: 8,
      });
    });
    const dataPackage = new DataPackage(datapoints, timestampMilliseconds);
    const signedDataPackages = [dataPackage.sign(MOCK_PRIVATE_KEYS[0])];

    return RedstonePayload.prepare(
      signedDataPackages,
      "kresko-redstone-viem#simple-mock"
    );
  };

  public static getSimpleNumericMockPayload = (
    config: SimpleNumericMockConfig
  ) => {
    if (config.mockSignersCount > MAX_MOCK_SIGNERS_COUNT) {
      throw new Error(
        `mockSignersCount should be <= ${MAX_MOCK_SIGNERS_COUNT}`
      );
    }

    // Prepare mock data packages configs
    const mockDataPackages: MockDataPackageConfig[] = [];
    for (
      let signerIndex = 0;
      signerIndex < config.mockSignersCount;
      signerIndex++
    ) {
      for (const dataPointObj of config.dataPoints) {
        mockDataPackages.push({
          signer: getMockSignerAddress(signerIndex as MockSignerIndex),
          dataPackage: new DataPackage(
            [new NumericDataPoint(dataPointObj)],
            config.timestampMilliseconds || DEFAULT_TIMESTAMP_FOR_TESTS
          ),
        });
      }
    }

    return RedstonePayload.prepare(
      mockDataPackages.map(({ dataPackage, signer }) =>
        dataPackage.sign(getMockSignerPrivateKey(signer))
      ),
      "kresko-redstone-viem#simple-numeric-mock"
    );
  };
}
