import { useRouter } from 'next/router';
import { useWeb3 } from '../../context/Web3Context';
import CharityDetails from '../../components/CharityDetails';

export default function CharityPage() {
  const router = useRouter();
  const { id } = router.query;
  const { contract } = useWeb3();

  if (!id) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <CharityDetails charityId={id} />
    </div>
  );
}