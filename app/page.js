'use client';

import React from 'react';
import Image from 'next/image';

import FearScreen from './components/FearScreen';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ENDPOINT = '/api/image';
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function Home() {
  // initial || loading || success || error
  const [imageStatus, setImageStatus] = React.useState('initial');
  const [storyStatus, setStoryStatus] = React.useState('initial');

  const [imageURI, setImageURI] = React.useState(null);
  const [story, setStory] = React.useState('');

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

  async function handleGemini(event) {
    event.preventDefault();

    setStoryStatus('loading');

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt =
        'Give me some facts to help me get over my fear of spiders.';

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setStory(text);

      setStoryStatus('success');
    } catch (err) {
      setStoryStatus('error');
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
      <form onSubmit={handleGemini}>
        <button>Generate story</button>
      </form>
      {storyStatus}
      <br />
      {story}
    </main>
  );
}
