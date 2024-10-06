import React from 'react';
import Head from 'next/head';
import { Web3Provider } from '../context/Web3Context';
import Layout from '../components/Layout';
import '../styles/globals.css'; // Assuming you have global styles

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Head>
        <title>Blockchain Charity Platform</title>
        <meta name="description" content="Support causes you care about with blockchain technology" />
        <link rel="icon" href="/favicon.ico" />
        {/* You can add more meta tags here as needed */}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3Provider>
  );
}

export default MyApp;