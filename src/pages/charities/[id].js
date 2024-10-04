"use client"; 
import { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import DonateForm from '../../components/DonateForm';

const CharityDetails = ({ id }) => {
  const { contract } = useWeb3();
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    const fetchCharity = async () => {
      const charityDetails = await contract.charities(id);
      setCharity(charityDetails);
    };

    if (contract) fetchCharity();
  }, [contract, id]);

  return (
    <div>
      {charity ? (
        <div>
          <h2>{charity.name}</h2>
          <p>{charity.description}</p>
          <p>Goal: {ethers.utils.formatEther(charity.goalAmount)} ETH</p>
          <p>Raised: {ethers.utils.formatEther(charity.raisedAmount)} ETH</p>
          <p>Deadline: {new Date(parseInt(charity.deadline) * 1000).toLocaleString()}</p>
          <DonateForm charityId={id} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharityDetails;
