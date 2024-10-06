import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const CreateCharity = () => {
  const { contract, account } = useContext(Web3Context);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    goalAmount: '',
    deadline: '',
    milestones: ['']
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMilestoneChange = (index, value) => {
    const newMilestones = [...formData.milestones];
    newMilestones[index] = value;
    setFormData({ ...formData, milestones: newMilestones });
  };

  const addMilestone = () => {
    setFormData({ ...formData, milestones: [...formData.milestones, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.createCharity(
        formData.name,
        formData.description,
        formData.imageUrl,
        Web3.utils.toWei(formData.goalAmount, 'ether'),
        Math.floor(new Date(formData.deadline).getTime() / 1000),
        formData.milestones.map(m => Web3.utils.toWei(m, 'ether'))
      ).send({ from: account });
      // Handle success (e.g., show a success message, redirect)
    } catch (error) {
      console.error('Error creating charity:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Charity Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {/* Similar input fields for description, imageUrl, goalAmount, deadline */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Milestones</label>
        {formData.milestones.map((milestone, index) => (
          <input
            key={index}
            type="number"
            value={milestone}
            onChange={(e) => handleMilestoneChange(index, e.target.value)}
            placeholder={`Milestone ${index + 1} amount in ETH`}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        ))}
        <button type="button" onClick={addMilestone} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Milestone
        </button>
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Charity
      </button>
    </form>
  );
};

export default CreateCharity;