export const Kresko = {
  address: "0x0607e3b2a16048Fa3c77ec3A935ecEd978B5C7F3",
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address",
            },
            {
              internalType: "enum IDiamondCutFacet.FacetCutAction",
              name: "action",
              type: "uint8",
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          internalType: "struct IDiamondCutFacet.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "initContract",
              type: "address",
            },
            {
              internalType: "bytes",
              name: "initData",
              type: "bytes",
            },
          ],
          internalType: "struct Diamond.Initialization[]",
          name: "_initializations",
          type: "tuple[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      stateMutability: "payable",
      type: "fallback",
    },
    {
      inputs: [],
      name: "rescueNative",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address",
            },
            {
              internalType: "enum IDiamondCutFacet.FacetCutAction",
              name: "action",
              type: "uint8",
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          internalType: "struct IDiamondCutFacet.FacetCut[]",
          name: "_diamondCut",
          type: "tuple[]",
        },
        {
          internalType: "address",
          name: "_init",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "_calldata",
          type: "bytes",
        },
      ],
      name: "diamondCut",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_init",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "_calldata",
          type: "bytes",
        },
      ],
      name: "upgradeState",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "_functionSelector",
          type: "bytes4",
        },
      ],
      name: "facetAddress",
      outputs: [
        {
          internalType: "address",
          name: "facetAddress_",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "facetAddresses",
      outputs: [
        {
          internalType: "address[]",
          name: "facetAddresses_",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_facet",
          type: "address",
        },
      ],
      name: "facetFunctionSelectors",
      outputs: [
        {
          internalType: "bytes4[]",
          name: "facetFunctionSelectors_",
          type: "bytes4[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "facets",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "facetAddress",
              type: "address",
            },
            {
              internalType: "bytes4[]",
              name: "functionSelectors",
              type: "bytes4[]",
            },
          ],
          internalType: "struct IDiamondLoupeFacet.Facet[]",
          name: "facets_",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "acceptOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "initialized",
      outputs: [
        {
          internalType: "bool",
          name: "initialized_",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "owner_",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pendingOwner",
      outputs: [
        {
          internalType: "address",
          name: "pendingOwner_",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleAdmin",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "index",
          type: "uint256",
        },
      ],
      name: "getRoleMember",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
      ],
      name: "getRoleMemberCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "grantRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "hasRole",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "renounceRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "role",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "revokeRole",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4[]",
          name: "interfaceIds",
          type: "bytes4[]",
        },
        {
          internalType: "bytes4[]",
          name: "interfaceIdsToRemove",
          type: "bytes4[]",
        },
      ],
      name: "setERC165",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "_interfaceId",
          type: "bytes4",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CalldataMustHaveValidPayload",
      type: "error",
    },
    {
      inputs: [],
      name: "CalldataOverOrUnderFlow",
      type: "error",
    },
    {
      inputs: [],
      name: "CanNotPickMedianOfEmptyArray",
      type: "error",
    },
    {
      inputs: [],
      name: "IncorrectUnsignedMetadataSize",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "receivedSignersCount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requiredSignersCount",
          type: "uint256",
        },
      ],
      name: "InsufficientNumberOfUniqueSigners",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receivedSigner",
          type: "address",
        },
      ],
      name: "SignerNotAuthorised",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_kreskoAssetAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_feeType",
          type: "uint256",
        },
      ],
      name: "calcExpectedFee",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "collateralDeposits",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "getAccountCollateralRatio",
      outputs: [
        {
          internalType: "uint256",
          name: "ratio",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "getAccountCollateralValue",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "getAccountKrAssetValue",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_ratio",
          type: "uint256",
        },
      ],
      name: "getAccountMinimumCollateralValueAtRatio",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getCollateralAdjustedAndRealValue",
      outputs: [
        {
          internalType: "uint256",
          name: "adjustedValue",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "realValue",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_accounts",
          type: "address[]",
        },
      ],
      name: "getCollateralRatiosFor",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
      ],
      name: "getDepositedCollateralAssetIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "i",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "getDepositedCollateralAssets",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "getMintedKreskoAssets",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
      ],
      name: "getMintedKreskoAssetsIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "kreskoAssetDebt",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "kreskoAssetDebtInterest",
      outputs: [
        {
          internalType: "uint256",
          name: "assetAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "kissAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "kreskoAssetDebtInterestTotal",
      outputs: [
        {
          internalType: "uint256",
          name: "kissAmount",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "kreskoAssetDebtPrincipal",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_burnAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_mintedKreskoAssetIndex",
          type: "uint256",
        },
      ],
      name: "burnKreskoAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "batchCloseKrAssetDebtPositions",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
      ],
      name: "closeKrAssetDebtPosition",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "factor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "liquidationIncentive",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct CollateralAsset",
          name: "_config",
          type: "tuple",
        },
      ],
      name: "addCollateralAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_krAsset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "kFactor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "supplyLimit",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "closeFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "openFee",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct KrAsset",
          name: "_config",
          type: "tuple",
        },
      ],
      name: "addKreskoAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "admin",
              type: "address",
            },
            {
              internalType: "address",
              name: "council",
              type: "address",
            },
            {
              internalType: "address",
              name: "treasury",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "extOracleDecimals",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "minimumCollateralizationRatio",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minimumDebtValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "liquidationThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "oracleDeviationPct",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "sequencerUptimeFeed",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "sequencerGracePeriodTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "oracleTimeout",
              type: "uint256",
            },
          ],
          internalType: "struct MinterInitArgs",
          name: "args",
          type: "tuple",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_ammOracle",
          type: "address",
        },
      ],
      name: "updateAMMOracle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_cFactor",
          type: "uint256",
        },
      ],
      name: "updateCFactor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "factor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "liquidationIncentive",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct CollateralAsset",
          name: "_config",
          type: "tuple",
        },
      ],
      name: "updateCollateralAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint8",
          name: "_decimals",
          type: "uint8",
        },
      ],
      name: "updateExtOracleDecimals",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeRecipient",
          type: "address",
        },
      ],
      name: "updateFeeRecipient",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_kFactor",
          type: "uint256",
        },
      ],
      name: "updateKFactor",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_krAsset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "kFactor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "supplyLimit",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "closeFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "openFee",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct KrAsset",
          name: "_config",
          type: "tuple",
        },
      ],
      name: "updateKreskoAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_liquidationIncentiveMultiplier",
          type: "uint256",
        },
      ],
      name: "updateLiquidationIncentiveMultiplier",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_liquidationThreshold",
          type: "uint256",
        },
      ],
      name: "updateLiquidationThreshold",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_maxLiquidationMultiplier",
          type: "uint256",
        },
      ],
      name: "updateMaxLiquidationMultiplier",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_minimumCollateralizationRatio",
          type: "uint256",
        },
      ],
      name: "updateMinimumCollateralizationRatio",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_minimumDebtValue",
          type: "uint256",
        },
      ],
      name: "updateMinimumDebtValue",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_oracleDeviationPct",
          type: "uint256",
        },
      ],
      name: "updateOracleDeviationPct",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_oracleTimeout",
          type: "uint256",
        },
      ],
      name: "updateOracleTimeout",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_sequencerGracePeriodTime",
          type: "uint256",
        },
      ],
      name: "updateSequencerGracePeriodTime",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sequencerUptimeFeed",
          type: "address",
        },
      ],
      name: "updateSequencerUptimeFeed",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_depositAmount",
          type: "uint256",
        },
      ],
      name: "depositCollateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_withdrawAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_depositedCollateralAssetIndex",
          type: "uint256",
        },
      ],
      name: "withdrawCollateral",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_withdrawAmount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_depositedCollateralAssetIndex",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_userData",
          type: "bytes",
        },
      ],
      name: "withdrawCollateralUnchecked",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAssetToSeize",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_allowSeizeUnderflow",
          type: "bool",
        },
      ],
      name: "batchLiquidateInterest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_repayKreskoAsset",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAssetToSeize",
          type: "address",
        },
        {
          internalType: "bool",
          name: "_allowSeizeUnderflow",
          type: "bool",
        },
      ],
      name: "liquidateInterest",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_repayKreskoAsset",
          type: "address",
        },
        {
          internalType: "address",
          name: "_collateralAssetToSeize",
          type: "address",
        },
      ],
      name: "getMaxLiquidation",
      outputs: [
        {
          internalType: "uint256",
          name: "maxLiquidatableUSD",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "isAccountLiquidatable",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_repayAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_repayAmount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_seizeAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_repayAssetIndex",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_seizeAssetIndex",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_allowSeizeUnderflow",
          type: "bool",
        },
      ],
      name: "liquidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_mintAmount",
          type: "uint256",
        },
      ],
      name: "mintKreskoAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Action",
          name: "_action",
          type: "uint8",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "assetActionPaused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
        {
          internalType: "enum Action",
          name: "_action",
          type: "uint8",
        },
      ],
      name: "safetyStateFor",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "bool",
                  name: "enabled",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "timestamp0",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp1",
                  type: "uint256",
                },
              ],
              internalType: "struct Pause",
              name: "pause",
              type: "tuple",
            },
          ],
          internalType: "struct SafetyState",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "safetyStateSet",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bool",
          name: "val",
          type: "bool",
        },
      ],
      name: "setSafetyStateSet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_assets",
          type: "address[]",
        },
        {
          internalType: "enum Action",
          name: "_action",
          type: "uint8",
        },
        {
          internalType: "bool",
          name: "_withDuration",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "_duration",
          type: "uint256",
        },
      ],
      name: "toggleAssetsPaused",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "ammOracle",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
      ],
      name: "collateralAsset",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "factor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "liquidationIncentive",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct CollateralAsset",
          name: "asset",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
      ],
      name: "collateralExists",
      outputs: [
        {
          internalType: "bool",
          name: "exists",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "domainSeparator",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "extOracleDecimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feeRecipient",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllParams",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "minimumCollateralizationRatio",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minimumDebtValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "liquidationThreshold",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "liquidationOverflowPercentage",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "feeRecipient",
              type: "address",
            },
            {
              internalType: "uint8",
              name: "extOracleDecimals",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "oracleDeviationPct",
              type: "uint256",
            },
          ],
          internalType: "struct MinterParams",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_collateralAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_ignoreCollateralFactor",
          type: "bool",
        },
      ],
      name: "getCollateralValueAndOraclePrice",
      outputs: [
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "oraclePrice",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "_ignoreKFactor",
          type: "bool",
        },
      ],
      name: "getKrAssetValue",
      outputs: [
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
      ],
      name: "krAssetExists",
      outputs: [
        {
          internalType: "bool",
          name: "exists",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
      ],
      name: "kreskoAsset",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "kFactor",
              type: "uint256",
            },
            {
              internalType: "contract AggregatorV3Interface",
              name: "oracle",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "supplyLimit",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "anchor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "closeFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "openFee",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "exists",
              type: "bool",
            },
            {
              internalType: "bytes32",
              name: "redstoneId",
              type: "bytes32",
            },
          ],
          internalType: "struct KrAsset",
          name: "asset",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "liquidationIncentiveMultiplier",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "liquidationThreshold",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxLiquidationMultiplier",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minimumCollateralizationRatio",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minimumDebtValue",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "minterInitializations",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "oracleDeviationPct",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
      ],
      name: "batchRepayFullStabilityRateInterest",
      outputs: [
        {
          internalType: "uint256",
          name: "kissRepayAmount",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getDebtIndexForAsset",
      outputs: [
        {
          internalType: "uint256",
          name: "debtIndex",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getLastDebtIndexForAccount",
      outputs: [
        {
          internalType: "uint128",
          name: "lastDebtIndex",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getPriceRateForAsset",
      outputs: [
        {
          internalType: "uint256",
          name: "priceRate",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getStabilityRateConfigurationForAsset",
      outputs: [
        {
          components: [
            {
              internalType: "uint128",
              name: "debtIndex",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "optimalPriceRate",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope1",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope2",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "priceRateDelta",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "stabilityRate",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "stabilityRateBase",
              type: "uint128",
            },
            {
              internalType: "address",
              name: "asset",
              type: "address",
            },
            {
              internalType: "uint40",
              name: "lastUpdateTimestamp",
              type: "uint40",
            },
          ],
          internalType: "struct StabilityRateConfig",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "getStabilityRateForAsset",
      outputs: [
        {
          internalType: "uint256",
          name: "stabilityRate",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "kiss",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
      ],
      name: "repayFullStabilityRateInterest",
      outputs: [
        {
          internalType: "uint256",
          name: "kissRepayAmount",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address",
          name: "_kreskoAsset",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_kissRepayAmount",
          type: "uint256",
        },
      ],
      name: "repayStabilityRateInterestPartial",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint128",
              name: "stabilityRateBase",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope1",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope2",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "optimalPriceRate",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "priceRateDelta",
              type: "uint128",
            },
          ],
          internalType: "struct StabilityRateParams",
          name: "_setup",
          type: "tuple",
        },
      ],
      name: "setupStabilityRateParams",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_kiss",
          type: "address",
        },
      ],
      name: "updateKiss",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
      ],
      name: "updateStabilityRateAndIndexForAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_asset",
          type: "address",
        },
        {
          components: [
            {
              internalType: "uint128",
              name: "stabilityRateBase",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope1",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "rateSlope2",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "optimalPriceRate",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "priceRateDelta",
              type: "uint128",
            },
          ],
          internalType: "struct StabilityRateParams",
          name: "_setup",
          type: "tuple",
        },
      ],
      name: "updateStabilityRateParams",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_assets",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_oracles",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_marketStatusOracles",
          type: "address[]",
        },
      ],
      name: "batchOracleValues",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "assetAddress",
              type: "address",
            },
            {
              internalType: "uint80",
              name: "roundId",
              type: "uint80",
            },
            {
              internalType: "bool",
              name: "marketOpen",
              type: "bool",
            },
          ],
          internalType: "struct LibUI.Price[]",
          name: "result",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_account",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "_tokens",
          type: "address[]",
        },
        {
          internalType: "address",
          name: "_staking",
          type: "address",
        },
      ],
      name: "getAccountData",
      outputs: [
        {
          components: [
            {
              components: [
                {
                  internalType: "address",
                  name: "assetAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "oracleAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "anchorAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountScaled",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "priceRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "stabilityRate",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountUSD",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kFactor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "ammPrice",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "symbol",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "openFee",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "closeFee",
                  type: "uint256",
                },
              ],
              internalType: "struct LibUI.krAssetInfoUser[]",
              name: "krAssets",
              type: "tuple[]",
            },
            {
              components: [
                {
                  internalType: "address",
                  name: "assetAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "oracleAddress",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "anchorAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountUSD",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "cFactor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "liquidationIncentive",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "decimals",
                  type: "uint8",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "price",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "symbol",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              internalType: "struct LibUI.CollateralAssetInfoUser[]",
              name: "collateralAssets",
              type: "tuple[]",
            },
            {
              internalType: "uint256",
              name: "healthFactor",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "debtActualUSD",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "debtUSD",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "collateralActualUSD",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "collateralUSD",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minCollateralUSD",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "borrowingPowerUSD",
              type: "uint256",
            },
          ],
          internalType: "struct LibUI.KreskoUser",
          name: "user",
          type: "tuple",
        },
        {
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "balance",
              type: "uint256",
            },
          ],
          internalType: "struct LibUI.Balance[]",
          name: "balances",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "pid",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "depositToken",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "totalDeposits",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "allocPoint",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "rewardPerBlocks",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "lastRewardBlock",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "depositAmount",
              type: "uint256",
            },
            {
              internalType: "address[]",
              name: "rewardTokens",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "rewardAmounts",
              type: "uint256[]",
            },
          ],
          internalType: "struct LibUI.StakingData[]",
          name: "stakingData",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_allTokens",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_assets",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_priceFeeds",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_marketStatusOracles",
          type: "address[]",
        },
      ],
      name: "getTokenData",
      outputs: [
        {
          components: [
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "totalSupply",
              type: "uint256",
            },
          ],
          internalType: "struct LibUI.TokenMetadata[]",
          name: "metadatas",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "assetAddress",
              type: "address",
            },
            {
              internalType: "uint80",
              name: "roundId",
              type: "uint80",
            },
            {
              internalType: "bool",
              name: "marketOpen",
              type: "bool",
            },
          ],
          internalType: "struct LibUI.Price[]",
          name: "prices",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_collateralAssets",
          type: "address[]",
        },
        {
          internalType: "address[]",
          name: "_krAssets",
          type: "address[]",
        },
      ],
      name: "getGlobalData",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "assetAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "oracleAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "anchorAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "liquidationIncentive",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "cFactor",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "decimals",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bool",
              name: "marketOpen",
              type: "bool",
            },
          ],
          internalType: "struct LibUI.CollateralAssetInfo[]",
          name: "collateralAssets",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "oracleAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "assetAddress",
              type: "address",
            },
            {
              internalType: "address",
              name: "anchorAddress",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "ammPrice",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "priceRate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "stabilityRate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "openFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "closeFee",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "kFactor",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "bool",
              name: "marketOpen",
              type: "bool",
            },
          ],
          internalType: "struct LibUI.krAssetInfo[]",
          name: "krAssets",
          type: "tuple[]",
        },
        {
          components: [
            {
              internalType: "uint256",
              name: "minDebtValue",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "minCollateralRatio",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "liquidationThreshold",
              type: "uint256",
            },
          ],
          internalType: "struct LibUI.ProtocolParams",
          name: "protocolParams",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_pairAddresses",
          type: "address[]",
        },
      ],
      name: "getPairsData",
      outputs: [
        {
          components: [
            {
              internalType: "uint8",
              name: "decimals0",
              type: "uint8",
            },
            {
              internalType: "uint8",
              name: "decimals1",
              type: "uint8",
            },
            {
              internalType: "uint256",
              name: "reserve0",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "reserve1",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "totalSupply",
              type: "uint256",
            },
          ],
          internalType: "struct LibUI.PairData[]",
          name: "result",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "CalldataMustHaveValidPayload",
      type: "error",
    },
    {
      inputs: [],
      name: "CalldataOverOrUnderFlow",
      type: "error",
    },
    {
      inputs: [],
      name: "EachSignerMustProvideTheSameValue",
      type: "error",
    },
    {
      inputs: [],
      name: "EmptyCalldataPointersArr",
      type: "error",
    },
    {
      inputs: [],
      name: "IncorrectUnsignedMetadataSize",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "receivedSignersCount",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "requiredSignersCount",
          type: "uint256",
        },
      ],
      name: "InsufficientNumberOfUniqueSigners",
      type: "error",
    },
    {
      inputs: [],
      name: "InvalidCalldataPointer",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receivedSigner",
          type: "address",
        },
      ],
      name: "SignerNotAuthorised",
      type: "error",
    },
  ],
} as const;
