import React, { useContext } from 'react';
import Link from 'next/link';
import { Web3Context } from '../context/Web3Context';

const Navbar = () => {
  const { account, initWeb3 } = useContext(Web3Context);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-white font-bold text-xl">Charity Platform</a>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/charities">
                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Charities</a>
              </Link>
              <Link href="/create">
                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Charity</a>
              </Link>
            </div>
          </div>
          <div>
            {account ? (
              <span className="text-gray-300 text-sm">{account.slice(0, 6)}...{account.slice(-4)}</span>
            ) : (
              <button
                onClick={initWeb3}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;