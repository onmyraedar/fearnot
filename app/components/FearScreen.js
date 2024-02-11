import FearInput from './FearInput';

export default function FearScreen({ handleSubmitFear }) {
  return (
    <>
      <p>What do *you* fear?</p>
      <FearInput handleSubmitFear={handleSubmitFear} />
    </>
  );
}
