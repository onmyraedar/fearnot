'use client';

import React from 'react';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';

import FearScreen from './components/FearScreen';
import SliderScreen from './components/SliderScreen';
import BackgroundScreen from './components/BackgroundScreen';

const ENDPOINT = '/api/image';
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function Home() {
  // initial || loading || success || error
  const [imageStatus, setImageStatus] = React.useState('initial');
  const [storyStatus, setStoryStatus] = React.useState('initial');

  const [imageURI, setImageURI] = React.useState(null);
  const [story, setStory] = React.useState('');

  const [fear, setFear] = React.useState('');
  const [screen, setScreen] = React.useState(1);

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

      const prompt = `Generate a personalized response in the form of a paragraph about a fear that I state alongside a fear scale that ranges from 1 to 10. The response text should be split into two different paragraph. The first paragraph and the second paragraph length must each be below 150 words detailing the general background and justification of the specific fear while taking into account the fear scale. The second paragraph must have the title or heading "solution" which details the potential coping mechanisms and solutions to the fear.

        Paragraph format should be as follows
        
        Paragraph 1 - "Background:" Response text
        
        Paragraph 2 - "Solutions:" Response text
        
        Fear: Snakes
        
        Fear Scale: 2`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setStory(text);

      setStoryStatus('success');
    } catch (err) {
      setStoryStatus('error');
    }
  }

  function handleSubmitFear(event) {
    event.preventDefault();

    console.log({ fear: event.target[0].value });
    setFear(event.target[0].value);

    const nextScreen = screen + 1;
    setScreen(nextScreen);
  }

  async function handleSubmitRating(event) {
    event.preventDefault();

    console.log({ rating: event.target[0].value });

    setStoryStatus('loading');

    const nextScreen = screen + 1;
    setScreen(nextScreen);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate a personalized response in the form of a paragraph about a fear that I state alongside a fear scale that ranges from 1 to 10. The response text should be split into two different paragraph. The first paragraph and the second paragraph length must each be below 150 words detailing the general background and justification of the specific fear while taking into account the fear scale. The second paragraph must have the title or heading "Solutions:" which details the potential coping mechanisms and solutions to the fear. It will be used to parse response text.

      Paragraph format should be as follows
      
      Paragraph 1 - "Background:" Response text
      
      Paragraph 2 - "Solutions:" Response text
      
      Fear: ${fear}
      
      Fear Scale: ${event.target[0].value}`;

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
      <button onClick={() => setScreen(1)}>Return home</button>
      {screen === 1 && <FearScreen handleSubmitFear={handleSubmitFear} />}
      {screen === 2 && (
        <SliderScreen fear={fear} handleSubmitRating={handleSubmitRating} />
      )}
      {screen === 3 && (
        <BackgroundScreen story={story} storyStatus={storyStatus} />
      )}
      {/* <form onSubmit={handleSubmit}>
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
      {story} */}
    </main>
  );
}
