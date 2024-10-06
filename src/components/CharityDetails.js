import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../context/Web3Context';
import DonateForm from './DonateForm';

const CharityDetails = ({ charityId }) => {
  const { contract } = useContext(Web3Context);
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    const fetchCharity = async () => {
      if (contract) {
        const charityData = await contract.methods.charities(charityId).call();
        setCharity(charityData);
      }
    };
    fetchCharity();
  }, [contract, charityId]);

  if (!charity) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={charity.imageUrl} alt={charity.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{charity.name}</h2>
        <p className="text-gray-600 mb-4">{charity.description}</p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(charity.raisedAmount / charity.goalAmount) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span>{charity.raisedAmount} ETH raised</span>
            <span>{charity.goalAmount} ETH goal</span>
          </div>
        </div>
        <DonateForm charityId={charityId} />
      </div>
    </div>
  );
};

export default CharityDetails;