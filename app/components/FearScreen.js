import FearInput from './FearInput';

import styles from '../styles/FearScreen.module.css';

export default function FearScreen({ handleSubmitFear }) {
  return (
    <>
      <h1 className={styles.title}>What do you fear?</h1>
      <FearInput handleSubmitFear={handleSubmitFear} />
    </>
  );
}
