"use client"; 
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const CreateCharity = () => {
  const { contract, account } = useWeb3();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [milestones, setMilestones] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async () => {
    const goalAmount = ethers.utils.parseEther(goal); // Convert goal to Wei
    const milestonesArray = milestones.split(',').map(milestone => ethers.utils.parseEther(milestone.trim()));
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000); // Convert to UNIX timestamp

    try {
      await contract.createCharity(name, description, goalAmount, deadlineTimestamp, milestonesArray, { from: account });
      alert('Charity created successfully!');
    } catch (error) {
      console.error('Error creating charity:', error);
      alert('Error creating charity. Please check the details and try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Create a Charity</h1>
      <input
        type="text"
        placeholder="Charity Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Charity Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Goal (ETH)"
        value={goal}
        onChange={e => setGoal(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Milestones (comma-separated, ETH)"
        value={milestones}
        onChange={e => setMilestones(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>Create Charity</button>
    </div>
  );
};

export default CreateCharity;
