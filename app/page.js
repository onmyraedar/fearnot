'use client';

import React from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import FearScreen from './components/FearScreen';
import SliderScreen from './components/SliderScreen';
import BackgroundScreen from './components/BackgroundScreen';
import ImagePathScreen from './components/ImagePathScreen';
import SolutionPathScreen from './components/SolutionPathScreen';
import ThankYouScreen from './components/ThankYouScreen';

import styles from './styles/page.module.css';

const ENDPOINT = '/api/image';
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function Home() {
  // initial || loading || success || error
  const [storyStatus, setStoryStatus] = React.useState('initial');
  const [imageGenStatus, setImageGenStatus] = React.useState('initial');

  const [story, setStory] = React.useState('');

  const [fear, setFear] = React.useState('');
  const [rating, setRating] = React.useState(1);

  const [screen, setScreen] = React.useState(1);

  const [path, setPath] = React.useState('');

  const [imagePrompt, setImagePrompt] = React.useState('');
  const [imageURI, setImageURI] = React.useState('');

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
    setRating(event.target[0].value);

    const nextScreen = screen + 1;
    setScreen(nextScreen);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Generate a personalized response in the form of a paragraph about a fear that I state alongside a fear scale that ranges from 1 to 10. 
      The response text should be split into two different paragraph. 
      The first paragraph and the second paragraph length must each be below 150 words detailing the general background and justification of the specific fear while taking into account the fear scale. 
      The second paragraph must have the title or heading "Solutions:" which details comforting facts about the fear. It will be used to parse response text.

      Paragraph format should be as follows
      
      Paragraph 1 - "Background:" Response text
      
      Paragraph 2 - "Solutions:" Response text
      
      Fear: ${fear}
      
      Fear Scale: ${event.target[0].value}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const [background, solution] = text.split('**Solutions:**');

      const prompt2 = `Generate a text to image prompt relating to a fear and rating that I provide. The rating range is from 1 to 10 where 1 represents low level of fear and 10 represents high level of fear. If the rating is 10, the prompt should not be fearful or scary. If the rating is 1, the prompt should be scary and fearful. The fear text should be present in every prompt. Response text should not be longer than 20 words.
      Fear: ${fear}
      Rating: ${event.target[0].value}
      Response text should look as follows:
      "Prompt:" Response text
      Do not give any additional information besides the prompt itself. 
      Only generate a single prompt.`;

      const result2 = await model.generateContent(prompt2);
      const response2 = await result2.response;
      const text2 = response2.text().replace('Prompt:', '');

      console.log({ background, solution });
      console.log({ prompt: text2 });

      setStory({ background, solution });
      setImagePrompt(text2);

      setStoryStatus('success');
    } catch (err) {
      setStoryStatus('error');
    }
  }

  function handleSetPath(value) {
    setPath(value);
  }

  async function handleSubmitPath(event) {
    event.preventDefault();

    if (path === 'image') {
      setImageGenStatus('loading');

      const nextScreen = screen + 1;
      setScreen(nextScreen);

      try {
        const response = await fetch(`${ENDPOINT}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: imagePrompt,
          }),
        });
        console.log(response);
        const json = await response.json();
        console.log(json);
        setImageURI(json.images[0]);
        setImageGenStatus('success');
      } catch (err) {
        setImageGenStatus('error');
      }
    } else {
      const nextScreen = screen + 1;
      setScreen(nextScreen);
    }
  }

  function goToNextScreen() {
    const nextScreen = screen + 1;
    setScreen(nextScreen);
  }

  return (
    <main>
      {screen !== 1 &&
        storyStatus !== 'loading' &&
        imageGenStatus !== 'loading' && (
          <button className={styles.button} onClick={() => setScreen(1)}>
            Home
          </button>
        )}
      {screen === 1 && <FearScreen handleSubmitFear={handleSubmitFear} />}
      {screen === 2 && (
        <SliderScreen fear={fear} handleSubmitRating={handleSubmitRating} />
      )}
      {screen === 3 && (
        <BackgroundScreen
          story={story}
          storyStatus={storyStatus}
          handleSetPath={handleSetPath}
          handleSubmitPath={handleSubmitPath}
        />
      )}
      {screen === 4 && path === 'image' && (
        <ImagePathScreen
          imagePrompt={imagePrompt}
          imageGenStatus={imageGenStatus}
          imageURI={imageURI}
          handleSetPath={handleSetPath}
        />
      )}
      {screen === 4 && path === 'solution' && (
        <SolutionPathScreen
          story={story}
          goToNextScreen={goToNextScreen}
        />
      )}
      {screen === 5 && <ThankYouScreen />}
    </main>
  );
}
