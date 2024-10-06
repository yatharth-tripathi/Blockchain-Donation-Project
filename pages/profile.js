import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

export default function ProfilePage() {
  const { account, contract } = useWeb3();
  const [userCharities, setUserCharities] = useState([]);
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (contract && account) {
        // Fetch charities created by the user
        const charityCount = await contract.methods.charityCount().call();
        const allCharities = await Promise.all(
          Array.from({ length: charityCount }, (_, i) =>
            contract.methods.charities(i + 1).call()
          )
        );
        const userCreatedCharities = allCharities.filter(charity => charity.owner === account);
        setUserCharities(userCreatedCharities);

        // Fetch donations made by the user
        // Note: This is a simplified example. In a real-world scenario, you'd need a more efficient way to fetch user donations.
        const donationCount = await contract.methods.donationCount().call();
        const allDonations = await Promise.all(
          Array.from({ length: donationCount }, (_, i) =>
            contract.methods.charityDonations(i + 1).call()
          )
        );
        const userDonations = allDonations.filter(donation => donation.donor === account);
        setUserDonations(userDonations);
      }
    };

    fetchUserData();
  }, [contract, account]);

  if (!account) {
    return <div>Please connect your wallet to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Your Profile</h1>
      <p className="mb-4">Connected Account: {account}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Created Charities</h2>
      {userCharities.length > 0 ? (
        <ul className="list-disc pl-5">
          {userCharities.map((charity) => (
            <li key={charity.id}>{charity.name} - Goal: {charity.goalAmount} ETH</li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any charities yet.</p>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Donations</h2>
      {userDonations.length > 0 ? (
        <ul className="list-disc pl-5">
          {userDonations.map((donation, index) => (
            <li key={index}>Donated {donation.amount} ETH to Charity ID: {donation.charityId}</li>
          ))}
        </ul>
      ) : (
        <p>You haven't made any donations yet.</p>
      )}
    </div>
  );
}