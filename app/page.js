'use client';

import React from 'react';
import Image from 'next/image';

import FearScreen from './components/FearScreen';

const ENDPOINT = '/api/image';

export default function Home() {

  // initial || loading || success || error
  const [imageStatus, setImageStatus] = React.useState('initial');
  const [imageURI, setImageURI] = React.useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    setImageStatus('loading');

    try {
      const response = await fetch(`${ENDPOINT}`, {
        method: 'GET',
      });

      const json = await response.json();

      setImageURI(json.images[0]);

      setImageStatus('success');
    } catch (err) {
      setImageStatus('error');
    }
  }

  return (
    <main>
      <FearScreen />
      <form onSubmit={handleSubmit}>
        <button>Generate image</button>
      </form>
      {imageStatus}
      <br />
      {imageURI ? (
        <Image
          src={`data:image/jpeg;base64,${imageURI}`}
          width={1024}
          height={1024}
          alt="dog"
        />
      ) : (
        'Nothing to see here...'
      )}
    </main>
  );
}
