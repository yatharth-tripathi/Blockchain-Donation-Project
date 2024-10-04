"use client"; 
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/create">Create Charity</Link>
      <Link href="/about">About Us</Link>  {/* Add About Us link */}
      <Link href="/profile">Profile</Link>
      <ConnectButton />
    </nav>
  );
};

export default Navbar;
