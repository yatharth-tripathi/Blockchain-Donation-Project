"use client";

import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

const HomePage = () => {
  const { contract, account, loading } = useWeb3();
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    if (!loading && contract) {
      const fetchCharities = async () => {
        try {
          const charityList = await contract.getAllCharities();
          setCharities(charityList);
        } catch (error) {
          console.error("Error fetching charities:", error);
        }
      };

      fetchCharities();
    }
  }, [loading, contract]);

  if (loading) {
    return <p>Loading Web3...</p>;
  }

  return (
    <div>
      <h1>Charities</h1>
      {charities.length ? (
        charities.map((charity, index) => (
          <div key={index}>
            <h3>{charity.name}</h3>
            <p>{charity.description}</p>
          </div>
        ))
      ) : (
        <p>No charities found</p>
      )}
    </div>
  );
};

export default HomePage;
