/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia } from "@reown/appkit/networks";
import { defineChain } from "@reown/appkit/networks";

// For defining the CrossFi Network
// const crossFI = defineChain({
//   id: 123456789,
//   caipNetworkId: "eip155:123456789",
//   chainNamespace: "eip155",
//   name: "Custom Network",
//   nativeCurrency: {
//     decimals: 18,
//     name: "Ether",
//     symbol: "ETH",
//   },
//   rpcUrls: {
//     default: {
//       http: ["https://tendermint-rpc.testnet.ms/"],
//       webSocket: ["WS_RPC_URL"],
//     },
//   },
//   blockExplorers: {
//     default: { name: "Explorer", url: "BLOCK_EXPLORER_URL" },
//   },
//   contracts: {
//     // Add the contracts here
//   },
// });

export const crossfi = defineChain({
  id: 4157,
  name: "CrossFi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  rpcUrls: {
    default: {
      http: [
        "https://crossfi-testnet.blastapi.io/02aed652-3771-4acc-bf97-79a2ea437e21",
      ],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://test.xfiscan.com/" },
  },
});

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [sepolia, crossfi];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
