import React from 'react';
import Markdown from 'react-markdown'

export default function BackgroundScreen({ story, storyStatus }) {
  return (
    <>
      <p>{storyStatus}</p>
      <Markdown>{story}</Markdown>
    </>
  );
}
