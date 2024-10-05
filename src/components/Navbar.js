"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { useWeb3 } from '../context/Web3Context'; // Access Web3Context

const Navbar = () => {
  const { account, connectWallet } = useWeb3(); // Get account and connectWallet function from context

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/create">Create Charity</Link>
      <Link href="/about">About Us</Link>
      <Link href="/profile">Profile</Link>

      {/* Wallet Connect Button */}
      {account ? (
        <p>Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}</p> // Display connected wallet
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button> // Button to connect wallet
      )}
    </nav>
  );
};

export default Navbar;
