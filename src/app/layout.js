"use client";

import { useEffect, useState } from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createConfig, sepolia } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from '../components/Navbar';

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const walletConnectProjectId = '4744e0f89d64a0aec1ec1b23e4b1a06d';

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Decentralized Donation Platform',
  projectId: walletConnectProjectId,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const Layout = ({ children }) => {
  const [blockInfo, setBlockInfo] = useState(null);

  useEffect(() => {
    const getBlockInfo = async () => {
      try {
        const blockNumber = await publicClient.getBlockNumber();
        const block = await publicClient.getBlock({ blockNumber });
        setBlockInfo({
          number: Number(block.number),
          hash: block.hash,
          timestamp: Number(block.timestamp)
        });
        console.log(block);
      } catch (error) {
        console.error("Error fetching block info:", error);
      }
    };

    getBlockInfo();
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <main>
          {children}
          {blockInfo && (
            <div>
              <h3>Block Info:</h3>
              <p>Block Number: {blockInfo.number}</p>
              <p>Block Hash: {blockInfo.hash}</p>
              <p>Timestamp: {new Date(blockInfo.timestamp * 1000).toLocaleString()}</p>
            </div>
          )}
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Layout;