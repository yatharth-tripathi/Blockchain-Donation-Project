import { useWeb3 } from 'path/to/useWeb3'; // Ensure this import is correct
import Navbar from 'path/to/Navbar'; // Ensure this import is correct
import Footer from 'path/to/Footer'; // Ensure this import is correct

export default function Layout({ children }) {
  const { loading, account } = useWeb3();
  
  console.log("Loading state: ", loading); // Log loading state to debug
  console.log("Account: ", account);

  if (loading) {
    return <p>Loading Web3...</p>;
  }

  // Optional: Handle case where account is null or undefined
  if (!account) {
    return <p>No account found.</p>; // Add a message if no account is available
  }

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
