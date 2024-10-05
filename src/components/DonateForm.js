"use client"; 
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const DonateForm = ({ charityId }) => {
  const { contract, account } = useWeb3();
  const [amount, setAmount] = useState('');

  const handleDonate = async () => {
    const value = ethers.utils.parseEther(amount);  // Convert ETH to Wei
    try {
      await contract.donateToCharity(charityId, { from: account, value });
      alert('Donation successful!');
    } catch (error) {
      console.error('Error in donation:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default DonateForm;
