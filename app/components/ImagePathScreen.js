import Image from 'next/image';

export default function ImagePathScreen({
  path,
  imagePrompt,
  imageGenStatus,
  imageURI,
  handleSetPath,
}) {
  return (
    <>
      <p>{imageGenStatus}</p>
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
