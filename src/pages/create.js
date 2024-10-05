"use client";

import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const CreateCharity = () => {
  const { contract, account, loading } = useWeb3(); // Destructure Web3 context

  // States for form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const createNewCharity = async () => {
    if (loading) {
      alert("Web3 is still loading. Please wait...");
      return;
    }

    if (!contract || !account) {
      alert("Wallet not connected or contract not available.");
      return;
    }

    try {
      const tx = await contract.createCharity(name, description, ethers.utils.parseEther(goal));
      await tx.wait();
      alert("Charity created successfully!");
    } catch (error) {
      console.error("Error creating charity:", error);
      alert("Failed to create charity.");
    }
  };

  return (
    <div>
      <h1>Create Charity</h1>
      <form onSubmit={(e) => { e.preventDefault(); createNewCharity(); }}>
        <div>
          <label htmlFor="name">Charity Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="goal">Goal Amount (in ETH)</label>
          <input
            id="goal"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <button type="submit">Create Charity</button>
      </form>
    </div>
  );
};

export default CreateCharity;
