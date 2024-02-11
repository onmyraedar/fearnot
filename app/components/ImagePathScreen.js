import Image from 'next/image';

import LoadingBar from './LoadingBar';

export default function ImagePathScreen({
  imagePrompt,
  imageGenStatus,
  imageURI,
  handleSetPath,
}) {
  return (
    <>
      {imageGenStatus === 'loading' && <LoadingBar />}
      {imageGenStatus === 'error' && <p>Sorry, something went wrong.</p>}
      {imageGenStatus === 'success' && (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSetPath('solution');
            }}
          >
            <button type="submit">I want solutions</button>
          </form>
          <Image
            src={`data:image/jpeg;base64,${imageURI}`}
            width={1024}
            height={1024}
            alt={imagePrompt}
          />
        </>
      )}
    </>
  );
}
