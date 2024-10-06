"use client"; // Ensure it's a client-side component

import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CharityPlatformABI from '../contracts/abi.json'; // Adjust this path if necessary
import { CONTRACT_ADDRESS } from '../contracts/contractAddress'; // Adjust this path if necessary

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CharityPlatformABI, signer);

        setProvider(web3Provider);
        setAccount(accounts[0]);
        setContract(contractInstance);
        setLoading(false);
        console.log("Wallet connected:", accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask to use this app!');
      setLoading(false);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <Web3Context.Provider value={{ loading, account, provider, contract }}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to access Web3 context
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};
