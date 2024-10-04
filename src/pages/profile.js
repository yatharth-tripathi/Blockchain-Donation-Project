"use client"; 
import { useEffect, useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const ProfilePage = () => {
  const { contract, account } = useWeb3();
  const [createdCharities, setCreatedCharities] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  
  useEffect(() => {
    const fetchUserCharities = async () => {
      if (!contract || !account) return;

      try {
        const charityCount = await contract.charityCount();
        const userCharities = [];
        for (let i = 1; i <= charityCount; i++) {
          const charity = await contract.charities(i);
          if (charity.owner.toLowerCase() === account.toLowerCase()) {
            userCharities.push({
              id: i,
              name: charity.name,
              goalAmount: ethers.utils.formatEther(charity.goalAmount),
              raisedAmount: ethers.utils.formatEther(charity.raisedAmount),
              deadline: new Date(charity.deadline * 1000).toLocaleString(),
            });
          }
        }
        setCreatedCharities(userCharities);
      } catch (error) {
        console.error('Error fetching user charities:', error);
      }
    };

    const fetchDonationHistory = async () => {
      if (!contract || !account) return;

      try {
        const donationHistoryArray = [];
        const charityCount = await contract.charityCount();
        for (let i = 1; i <= charityCount; i++) {
          const donations = await contract.charityDonations(i);
          donations.forEach(donation => {
            if (donation.donor.toLowerCase() === account.toLowerCase()) {
              donationHistoryArray.push({
                charityId: i,
                amount: ethers.utils.formatEther(donation.amount),
                timestamp: new Date(donation.timestamp * 1000).toLocaleString(),
              });
            }
          });
        }
        setDonationHistory(donationHistoryArray);
      } catch (error) {
        console.error('Error fetching donation history:', error);
      }
    };

    fetchUserCharities();
    fetchDonationHistory();
  }, [contract, account]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Profile</h1>

      <h2>Charities You've Created</h2>
      {createdCharities.length > 0 ? (
        <ul>
          {createdCharities.map((charity, idx) => (
            <li key={idx}>
              <h3>{charity.name}</h3>
              <p>Goal: {charity.goalAmount} ETH</p>
              <p>Raised: {charity.raisedAmount} ETH</p>
              <p>Deadline: {charity.deadline}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any charities yet.</p>
      )}

      <h2>Your Donation History</h2>
      {donationHistory.length > 0 ? (
        <ul>
          {donationHistory.map((donation, idx) => (
            <li key={idx}>
              <p>Charity ID: {donation.charityId}</p>
              <p>Amount Donated: {donation.amount} ETH</p>
              <p>Date: {donation.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't made any donations yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;
