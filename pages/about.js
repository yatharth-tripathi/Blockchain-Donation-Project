import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">About Our Charity Platform</h1>
      <div className="prose lg:prose-xl">
        <p>
          Our blockchain-powered charity platform is dedicated to transforming the way people donate and support causes they care about. By leveraging the transparency and security of blockchain technology, we ensure that every donation reaches its intended recipient efficiently and verifiably.
        </p>
        <h2>Our Mission</h2>
        <p>
          We aim to create a global community of givers and changemakers, connected through technology and united by the desire to make a positive impact on the world.
        </p>
        <h2>How It Works</h2>
        <ol>
          <li>Charities create campaigns on our platform, detailing their goals and funding needs.</li>
          <li>Donors can browse campaigns and contribute using cryptocurrency.</li>
          <li>Smart contracts ensure funds are released to charities only when predetermined milestones are met.</li>
          <li>All transactions are recorded on the blockchain, providing complete transparency.</li>
        </ol>
        <h2>Join Us</h2>
        <p>
          Whether you're a charity looking to reach a global audience of donors, or an individual passionate about making a difference, we invite you to join our platform and be part of the future of giving.
        </p>
      </div>
    </div>
  );
}