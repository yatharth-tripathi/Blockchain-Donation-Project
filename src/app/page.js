"use client"; 
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import CharityCard from '../components/CharityCard';

const HomePage = () => {
  const { contract } = useWeb3();
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const fetchCharities = async () => {
      const charityCount = await contract.charityCount();
      const charityList = [];
      for (let i = 1; i <= charityCount; i++) {
        const charity = await contract.charities(i);
        charityList.push(charity);
      }
      setCharities(charityList);
    };

    if (contract) fetchCharities();
  }, [contract]);

  return (
    <div>
      <h1>Active Charities</h1>
      <div>
        {charities.map((charity, idx) => (
          <CharityCard key={idx} charity={charity} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
