import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { NetworkConnector } from "@web3-react/network-connector";

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  137: "https://polygon-mainnet.g.alchemy.com/v2/z31K9anv5tvGi7AxPhtSSD2FCBJvK0Wj",
  43113: "https://api.avax-test.network/ext/bc/C/rpc"
};

let obj = {}
if(process.env.NEXT_PUBLIC_CHAINID == 137) {
  obj = { 137: RPC_URLS[137] }
} else {
  obj = { 43113: RPC_URLS[43113] }
}

export const network = new NetworkConnector({ urls: obj });

export const injected = new InjectedConnector({
  supportedChainIds: [parseInt(process.env.NEXT_PUBLIC_CHAINID)]
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    137: RPC_URLS[137],
    43113: RPC_URLS[43113]
  },
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
});

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[process.env.NEXT_PUBLIC_CHAINID],
  appName: "Gaslyy",
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAINID),
});