import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

export function useCharityData(charityId) {
  const { contract } = useWeb3();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharityData() {
      if (!contract || !charityId) return;

      try {
        setLoading(true);
        const charityData = await contract.methods.charities(charityId).call();
        setCharity(charityData);
      } catch (err) {
        console.error('Error fetching charity data:', err);
        setError('Failed to fetch charity data');
      } finally {
        setLoading(false);
      }
    }

    fetchCharityData();
  }, [contract, charityId]);

  return { charity, loading, error };
}