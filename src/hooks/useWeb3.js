import { useState, useEffect } from 'react';

export const useWeb3 = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      // Logic to fetch account from Web3 provider
      // Example: const accounts = await web3.eth.getAccounts();
      // setAccount(accounts[0]);
      setLoading(false);
    };

    fetchAccount();
  }, []);

  return { loading, account };
};