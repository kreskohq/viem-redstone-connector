import {
  concat,
  keccak256,
  parseUnits,
  stringToBytes,
  toBytes,
  toHex,
} from "viem";
import {
  DataPackage,
  DataPackagesRequestParams,
  DataPoint,
  SignedDataPackage,
} from "./types";
export const SIGNATURE_BS = 65;

// Byte size of data feed id
export const DATA_FEED_ID_BS = 32;

// Number of bytes reserved to store timestamp
export const TIMESTAMP_BS = 6;

// Number of bytes reserved to store the number of data points
export const DATA_POINTS_COUNT_BS = 3;

// Number of bytes reserved to store datapoints byte size
export const DATA_POINT_VALUE_BYTE_SIZE_BS = 4;

export const UNSIGNED_METADATA_BYTE_SIZE_BS = 3;

export const DATA_PACKAGES_COUNT_BS = 2;

export const ZERO_DECIMALS = 0;

export const ORACLE_DECIMALS = 8;
export const REDSTONE_MARKER_HEX = "0x000002ed57011e0000";

const DEMO_URL = "https://d33trozg86ya9x.cloudfront.net";

export const REDSTONE_DATA_SERVICES_URLS: Record<string, string[]> = {
  "redstone-primary-prod": [
    "https://oracle-gateway-1.a.redstone.finance",
    "https://oracle-gateway-2.a.redstone.finance",
  ],
  // TODO: NOT DEPLOYED YET "redstone-primary-demo": [],
  "redstone-avalanche-prod": [
    "https://oracle-gateway-1.a.redstone.finance",
    "https://oracle-gateway-2.a.redstone.finance",
  ],
  "redstone-custom-urls-demo": ["https://d1zm8lxy9v2ddd.cloudfront.net"],
  "redstone-main-demo": [DEMO_URL],
  "redstone-rapid-demo": [DEMO_URL],
  "redstone-stocks-demo": [DEMO_URL],
  "redstone-twaps-demo": [DEMO_URL],
  "mock-data-service": ["http://valid-cache.com"],
};

export const resolveDataServiceUrls = (dataServiceId: string): string[] => {
  const urls = REDSTONE_DATA_SERVICES_URLS[dataServiceId];
  if (!urls) {
    throw Error(
      `Data service ${dataServiceId} is not configured by Redstone protocol`
    );
  }

  return urls;
};
export const dataPackageToBytes = (response: DataPackage): Uint8Array => {
  return concat([
    serializeDataPoints(response.dataPoints),
    numToBytes(response.timestampMilliseconds, ZERO_DECIMALS, TIMESTAMP_BS),
    numToBytes(
      numToBytes(response.dataPoints[0].value, ORACLE_DECIMALS, 32).length,
      ZERO_DECIMALS,
      DATA_POINT_VALUE_BYTE_SIZE_BS
    ),
    numToBytes(response.dataPoints.length, ZERO_DECIMALS, DATA_POINTS_COUNT_BS),
  ]);
};

export const getDataPackageHash = (response: DataPackage) => {
  return toBytes(keccak256(dataPackageToBytes(response)));
};

export const getPayloadBytes = (
  dpResponse: {
    [dataFeedId: string]: SignedDataPackage[];
  },
  reqParams: DataPackagesRequestParams
) => {
  const requestedDataFeedIds = reqParams.dataFeeds ?? ["___ALL_FEEDS___"];
  const result: Uint8Array[] = [];
  for (const dataFeedId of requestedDataFeedIds) {
    const dataFeedPackages = dpResponse[dataFeedId];

    if (!dataFeedPackages) {
      throw new Error(
        `Requested data feed id is not included in response: ${dataFeedId}`
      );
    }

    if (dataFeedPackages.length < reqParams.uniqueSignersCount) {
      throw new Error(
        `Too few unique signers for the data feed: ${dataFeedId}. ` +
          `Expected: ${reqParams.uniqueSignersCount}. ` +
          `Received: ${dataFeedPackages.length}`
      );
    }

    const serialized = dataFeedPackages
      .sort((a, b) => b.timestampMilliseconds - a.timestampMilliseconds) // redstone prefers newer data packages in the first order
      .slice(0, reqParams.uniqueSignersCount)
      .map((dataPackage) =>
        concat([
          dataPackageToBytes(dataPackage),
          toBytes(toHex(Buffer.from(dataPackage.signature, "base64"))),
        ])
      );

    result.push(...serialized);
  }
  return concat([
    ...result,
    numToBytes(result.length, ZERO_DECIMALS, DATA_PACKAGES_COUNT_BS),
  ]);
};

export const getPayloadHash = (
  payload: {
    [dataFeedId: string]: SignedDataPackage[];
  },
  reqParams: DataPackagesRequestParams,
  unsignedMetadata: string
) => {
  const unsignedMetadataBytes = stringToBytes(unsignedMetadata);
  const unsignedMetadataByteSizeBytes = toBytes(unsignedMetadataBytes.length, {
    size: 3,
  });

  return toHex(
    concat([
      getPayloadBytes(payload, reqParams),
      concat([unsignedMetadataBytes, unsignedMetadataByteSizeBytes]),
      toBytes(REDSTONE_MARKER_HEX),
    ])
  ).slice(2);
};
export const getMockHash = (
  payload: {
    [dataFeedId: string]: SignedDataPackage[];
  },
  reqParams: DataPackagesRequestParams,
  unsignedMetadata: string
) => {
  const payloadBytes = getPayloadBytes(payload, reqParams);

  const unsignedMetadataBytes = stringToBytes(unsignedMetadata);
  const unsignedMetadataByteSizeBytes = toBytes(unsignedMetadataBytes.length, {
    size: 3,
  });

  const payloadBytesWithUnsignedMetadata = concat([
    unsignedMetadataBytes,
    unsignedMetadataByteSizeBytes,
  ]);
  return toHex(
    concat([
      payloadBytes,
      payloadBytesWithUnsignedMetadata,
      toBytes(REDSTONE_MARKER_HEX),
    ])
  ).slice(2);
};

export const numToBytes = (
  value: number | string,
  decimals: number,
  byteSize: number,
  roundFractionalComponentIfExceedsDecimals: boolean = true
): Uint8Array => {
  const stringifiedNumber = roundFractionalComponentIfExceedsDecimals
    ? Number(value).toFixed(decimals)
    : String(value);

  return toBytes(parseUnits(stringifiedNumber, decimals), {
    size: byteSize,
  });
};

function dataPointToBytes(data: DataPoint): Uint8Array {
  return concat([
    toBytes(data.dataFeedId, {
      size: DATA_FEED_ID_BS,
    }),
    numToBytes(data.value, ORACLE_DECIMALS, 32),
  ]);
}

function serializeDataPoints(dataPoints: DataPoint[]): Uint8Array {
  // Sorting datapoints by bytes32 representation of dataFeedIds lexicographically
  const sorted = dataPoints.sort((dp1, dp2) => {
    const [id1, id2] = [
      toHex(dp1.dataFeedId, {
        size: DATA_FEED_ID_BS,
      }),
      toHex(dp2.dataFeedId, {
        size: DATA_FEED_ID_BS,
      }),
    ];

    const comparisonResult = id1.localeCompare(id2);
    console.assert(
      comparisonResult !== 0,
      `Duplicated dataFeedId found: ${dp1.dataFeedId}`
    );
    return comparisonResult;
  });

  return concat(sorted.map(dataPointToBytes));
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

export const requestPayloadHash = async (
  reqParams: DataPackagesRequestParams,
  metadata = ""
) => {
  return getPayloadHash(await requestPayload(reqParams), reqParams, metadata);
};

export const requestPayload = async (reqParams: DataPackagesRequestParams) => {
  const urls = reqParams.urls
    ? reqParams.urls
    : resolveDataServiceUrls(reqParams.dataServiceId);

  const response = await Promise.any(
    urls.map((url) =>
      fetch(`${url}/data-packages/latest/${reqParams.dataServiceId}`)
    )
  );

  return response.json();
};
