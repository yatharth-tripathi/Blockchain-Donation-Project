import React from 'react';
import CreateCharity from '../components/CreateCharity';

export default function CreateCharityPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Create a New Charity</h1>
      <CreateCharity />
    </div>
  );
}