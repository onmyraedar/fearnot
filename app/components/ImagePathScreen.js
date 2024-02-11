import Image from 'next/image';

export default function ImagePathScreen({
  path,
  imagePrompt,
  imageGenStatus,
  imageURI,
}) {
  return (
    <>
      <p>{imageGenStatus}</p>
      {imageGenStatus === 'success' && (
        <Image
          src={`data:image/jpeg;base64,${imageURI}`}
          width={1024}
          height={1024}
          alt={imagePrompt}
        />
      )}
    </>
  );
}
