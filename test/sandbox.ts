// const serializePriceValue = (value: number): number => {
//   return Math.round(value * 10 ** 8);
// };
// const serializeToMessage = (pricePackage: PricePackage) => {
//   // We clean and sort prices to be sure that prices
//   // always have the same format
//   const cleanPricesData = pricePackage.prices.map((p) => ({
//     symbol: convertStringToBytes32String(p.symbol),
//     value: serializePriceValue(p.value),
//   }));

//   const symbols: string[] = [];
//   const values: string[] = [];
//   cleanPricesData.forEach((p: ShortSinglePrice) => {
//     symbols.push(p.symbol);
//     values.push(p.value);
//   });
//   return {
//     symbols,
//     values,
//     timestamp: pricePackage.timestamp,
//   };
// };

// const convertStringToBytes32String = (str: string) => {
//   if (str.length > 31) {
//     // TODO: improve checking if str is a valid bytes32 string later
//     const bytes32StringLength = 32 * 2 + 2; // 32 bytes (each byte uses 2 symbols) + 0x
//     if (str.length === bytes32StringLength && str.startsWith("0x")) {
//       return str;
//     } else {
//       // Calculate keccak hash if string is bigger than 32 bytes
//       return keccak256(toHex(str));
//     }
//   } else {
//     return stringToHex(str);
//   }
// };
// export const getLiteDataBytesString = (
//   priceData: SerializedPriceData
// ): string => {
//   // Calculating lite price data bytes array
//   let data = "";
//   for (let i = 0; i < priceData.symbols.length; i++) {
//     const symbol = priceData.symbols[i];
//     const value = priceData.values[i];
//     data += symbol.substr(2) + value.toString(16).padStart(64, "0");
//   }
//   data += Math.ceil(priceData.timestamp / 1000)
//     .toString(16)
//     .padStart(64, "0");

//   return data;
// };

// const dataPackages = [
//   {
//     timestampMilliseconds: 1689938750000,
//     signature:
//       "cyCtifQGPE52wAkMaUl7t7386seQTEH5Vax6kPVz8JoU9kveapF9GnI/oCA01dRzV5ApPjk4WsAEXt1F0ERXLxw=",
//     isSignatureValid: true,
//     dataPoints: [
//       {
//         dataFeedId: "AVAX",
//         value: 13.8691678,
//       },
//     ],
//     dataServiceId: "redstone-avalanche-prod",
//     dataFeedId: "AVAX",
//     signerAddress: "0x109B4a318A4F5ddcbCA6349B45f881B4137deaFB",
//   },
//   {
//     timestampMilliseconds: 1689938750000,
//     signature:
//       "cyCtifQGPE52wAkMaUl7t7386seQTEH5Vax6kPVz8JoU9kveapF9GnI/oCA01dRzV5ApPjk4WsAEXt1F0ERXLxw=",
//     isSignatureValid: true,
//     dataPoints: [
//       {
//         dataFeedId: "AVAX",
//         value: 13.8691678,
//       },
//     ],
//     dataServiceId: "redstone-avalanche-prod",
//     dataFeedId: "AVAX",
//     signerAddress: "0x109B4a318A4F5ddcbCA6349B45f881B4137deaFB",
//   },
// ];

// const dataResponse = {
//   AVAX: [
//     {
//       timestampMilliseconds: 1689938750000,
//       signature:
//         "cyCtifQGPE52wAkMaUl7t7386seQTEH5Vax6kPVz8JoU9kveapF9GnI/oCA01dRzV5ApPjk4WsAEXt1F0ERXLxw=",
//       isSignatureValid: true,
//       dataPoints: [
//         {
//           dataFeedId: "AVAX",
//           value: 13.8691678,
//         },
//       ],
//       dataServiceId: "redstone-avalanche-prod",
//       dataFeedId: "AVAX",
//       signerAddress: "0x109B4a318A4F5ddcbCA6349B45f881B4137deaFB",
//     },
//     {
//       timestampMilliseconds: 1689938750000,
//       signature:
//         "xWeVAoBis0aBupzV3evlIMB77syIq1Nu3qfbFC9uCqxZI0d+ZzL/9ybcTyaKO0VASgoRcdaShDGvIA66UPoyuBw=",
//       isSignatureValid: true,
//       dataPoints: [
//         {
//           dataFeedId: "AVAX",
//           value: 13.8691678,
//         },
//       ],
//       dataServiceId: "redstone-avalanche-prod",
//       dataFeedId: "AVAX",
//       signerAddress: "0x12470f7aBA85c8b81D63137DD5925D6EE114952b",
//     },
//     {
//       timestampMilliseconds: 1689938750000,
//       signature:
//         "UaQhSrU7h1o757tJc79GWeGCtIZsd+d6vp7oaa5UnI9gwF338EWy6/3ND18mMEC44G2/pk+QrAQbmQ+vN9ElXxw=",
//       isSignatureValid: true,
//       dataPoints: [
//         {
//           dataFeedId: "AVAX",
//           value: 13.8691678,
//         },
//       ],
//       dataServiceId: "redstone-avalanche-prod",
//       dataFeedId: "AVAX",
//       signerAddress: "0x1eA62d73EdF8AC05DfceA1A34b9796E937a29EfF",
//     },
//     {
//       timestampMilliseconds: 1689938750000,
//       signature:
//         "xGBz1VnQYBBa0u8llKPfQR5eoOHidKTjRCaxeKQFkuoghjBNLaW1IFEXZ9yFQ1vV9RI/BCvEHWR79OSq+q7RMhw=",
//       isSignatureValid: true,
//       dataPoints: [
//         {
//           dataFeedId: "AVAX",
//           value: 13.8691678,
//         },
//       ],
//       dataServiceId: "redstone-avalanche-prod",
//       dataFeedId: "AVAX",
//       signerAddress: "0x2c59617248994D12816EE1Fa77CE0a64eEB456BF",
//     },
//     {
//       timestampMilliseconds: 1689938750000,
//       signature:
//         "59fusWfxcdh4Qr1k4Ovco55AvTc/k54eIpVBPzsd/JFrBZDqB4FehaSc7RLAE2h2OoFzQe5cpPAhdRD6cxfsHBw=",
//       isSignatureValid: true,
//       dataPoints: [
//         {
//           dataFeedId: "AVAX",
//           value: 13.8691678,
//         },
//       ],
//       dataServiceId: "redstone-avalanche-prod",
//       dataFeedId: "AVAX",
//       signerAddress: "0x83cbA8c619fb629b81A65C2e67fE15cf3E3C9747",
//     },
//   ],
// };

export const run = async () => {};
run();
