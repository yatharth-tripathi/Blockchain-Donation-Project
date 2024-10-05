import { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../contracts/abi.json';
import contractAddress from '../contracts/contractAddress';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true); // Ensure the loading state is set correctly

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const newProvider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await newProvider.send('eth_requestAccounts', []);
          const newSigner = newProvider.getSigner();
          const newContract = new ethers.Contract(contractAddress, abi, newSigner);

          setProvider(newProvider);
          setSigner(newSigner);
          setContract(newContract);
          setAccount(accounts[0]);
          setLoading(false); // Ensure loading is set to false after success
        } catch (error) {
          console.error("Error connecting wallet:", error);
          setLoading(false);
        }
      } else {
        alert('Please install MetaMask to use this app!');
        setLoading(false);
      }
    };

    connectWallet();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, contract, account, loading }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};
