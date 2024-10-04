import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';

const CreateCharity = () => {
  const { contract, account } = useWeb3();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [milestones, setMilestones] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async () => {
    const goalAmount = ethers.utils.parseEther(goal);
    const milestonesArray = milestones.split(',').map(milestone => ethers.utils.parseEther(milestone.trim()));
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    try {
      await contract.createCharity(name, description, goalAmount, deadlineTimestamp, milestonesArray, { from: account });
      alert('Charity created successfully!');
    } catch (error) {
      console.error('Error creating charity:', error);
    }
  };

  return (
    <div>
      <h2>Create a Charity</h2>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
      <input type="text" placeholder="Goal (ETH)" value={goal} onChange={e => setGoal(e.target.value)} />
      <input type="text" placeholder="Milestones (comma-separated)" value={milestones} onChange={e => setMilestones(e.target.value)} />
      <input type="date" placeholder="Deadline" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <button onClick={handleSubmit}>Create Charity</button>
    </div>
  );
};

export default CreateCharity;
