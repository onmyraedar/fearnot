import Image from 'next/image';

import LoadingBar from './LoadingBar';
import autoprefixer from 'autoprefixer';

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
            width={720}
            height={720}
            style={{height: "auto", maxWidth: "100vw"}}
            alt={imagePrompt}
          />
        </>
      )}
    </>
  );
}
