import React from 'react';
import Link from 'next/link';

const CharityCard = ({ charity }) => {
  const progress = (charity.raisedAmount / charity.goalAmount) * 100;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={charity.imageUrl} alt={charity.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{charity.name}</h3>
        <p className="text-gray-600 mb-4">{charity.description.slice(0, 100)}...</p>
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>{charity.raisedAmount} ETH raised</span>
            <span>{charity.goalAmount} ETH goal</span>
          </div>
        </div>
        <Link href={`/charities/${charity.id}`}>
          <a className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            View Details
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CharityCard;