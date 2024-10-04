import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CharityPlatformABI from '../contracts/CharityPlatformABI.json';
import contractAddress from '../contracts/contractAddress';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
      const userSigner = ethereumProvider.getSigner();
      const userContract = new ethers.Contract(contractAddress, CharityPlatformABI, userSigner);

      setProvider(ethereumProvider);
      setSigner(userSigner);
      setContract(userContract);

      const accounts = await ethereumProvider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ provider, signer, contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
