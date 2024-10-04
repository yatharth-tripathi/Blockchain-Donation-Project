import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import DonateForm from './DonateForm'; // Assuming you have a DonateForm component for donations

const CharityDetails = () => {
  const { contract } = useWeb3();
  const [charity, setCharity] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchCharity = async () => {
      if (id && contract) {
        try {
          const charityDetails = await contract.charities(id);
          setCharity({
            name: charityDetails.name,
            description: charityDetails.description,
            goalAmount: ethers.utils.formatEther(charityDetails.goalAmount),
            raisedAmount: ethers.utils.formatEther(charityDetails.raisedAmount),
            deadline: new Date(charityDetails.deadline * 1000).toLocaleString(),
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching charity details:', error);
          setLoading(false);
        }
      }
    };

    fetchCharity();
  }, [contract, id]);

  if (loading) {
    return <p>Loading charity details...</p>;
  }

  if (!charity) {
    return <p>No charity found.</p>;
  }

  return (
    <div>
      <h2>{charity.name}</h2>
      <p>{charity.description}</p>
      <p>Goal: {charity.goalAmount} ETH</p>
      <p>Raised: {charity.raisedAmount} ETH</p>
      <p>Deadline: {charity.deadline}</p>
      <DonateForm charityId={id} />
    </div>
  );
};

export default CharityDetails;
