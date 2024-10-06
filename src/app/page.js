import React from 'react';
import Link from 'next/link';
import { useWeb3 } from '../context/Web3Context';
import CharityCard from '../components/CharityCard';

export default function Home() {
  const { contract } = useWeb3();
  const [featuredCharities, setFeaturedCharities] = React.useState([]);

  React.useEffect(() => {
    const fetchFeaturedCharities = async () => {
      if (contract) {
        // This is a placeholder. You'll need to implement a method to get featured charities
        // For now, we'll just get the first 3 charities
        const charityCount = await contract.methods.charityCount().call();
        const charities = await Promise.all(
          Array.from({ length: Math.min(3, charityCount) }, (_, i) =>
            contract.methods.charities(i + 1).call()
          )
        );
        setFeaturedCharities(charities);
      }
    };

    fetchFeaturedCharities();
  }, [contract]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Welcome to the Charity Platform</h1>
      <p className="text-xl text-center mb-8">Support causes you care about with blockchain technology</p>
      
      <h2 className="text-2xl font-semibold mb-4">Featured Charities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCharities.map((charity) => (
          <CharityCard key={charity.id} charity={charity} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/charities">
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View All Charities
          </a>
        </Link>
      </div>
    </div>
  );
}