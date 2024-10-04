"use client"; 
import Link from 'next/link';

const CharityCard = ({ charity }) => {
  return (
    <div className="charity-card">
      <h3>{charity.name}</h3>
      <p>{charity.description}</p>
      <p>Goal: {ethers.utils.formatEther(charity.goalAmount)} ETH</p>
      <p>Raised: {ethers.utils.formatEther(charity.raisedAmount)} ETH</p>
      <Link href={`/charities/${charity.id}`}>
        <a>View Details</a>
      </Link>
    </div>
  );
};

export default CharityCard;
