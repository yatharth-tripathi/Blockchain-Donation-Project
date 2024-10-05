import { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const useCharityData = (charityId) => {
  const { contract } = useWeb3();
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    const fetchCharity = async () => {
      if (contract && charityId) {
        const charityDetails = await contract.charities(charityId); // Ensure the contract method is correct
        setCharity(charityDetails);
      }
    };

    if (contract) fetchCharity();
  }, [contract, charityId]);

  return charity;
};
