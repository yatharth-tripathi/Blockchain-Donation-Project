import { Web3Provider } from '../context/Web3Context'; // Ensure this path is correct
import Layout from '../app/layout'; // Ensure this path is correct

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
}

export default MyApp;