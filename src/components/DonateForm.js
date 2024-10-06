import React, { useState, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';

const DonateForm = ({ charityId }) => {
  const { web3, contract, account } = useContext(Web3Context);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.donateToCharity(charityId).send({
        from: account,
        value: web3.utils.toWei(amount, 'ether')
      });
      // Handle success (e.g., show a success message, update UI)
    } catch (error) {
      console.error('Error donating:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Donation Amount (ETH)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Donate
      </button>
    </form>
  );
};

export default DonateForm;