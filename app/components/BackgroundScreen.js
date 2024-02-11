import React from 'react';
import Markdown from 'react-markdown';

export default function BackgroundScreen({
  story,
  storyStatus,
  handleSetPath,
  handleSubmitPath,
}) {
  return (
    <>
      <p>{storyStatus}</p>
      {storyStatus === 'success' && (
        <>
          <Markdown>{story.background}</Markdown>
          <p>
            Viewing images can be the first step in overcoming your fear. Would
            you like to see an image?
          </p>
          <form onSubmit={handleSubmitPath}>
            <button
              type="submit"
              value="image"
              onClick={(event) => handleSetPath(event.target.value)}
            >
              Yes, I would love to
            </button>
            <button
              type="submit"
              value="solution"
              onClick={(event) => handleSetPath(event.target.value)}
            >
              No, take me to solutions
            </button>
          </form>
        </>
      )}
    </>
  );
}
