'use client';

import React from 'react';

import styles from '../styles/SliderScreen.module.css';

export default function SliderScreen({ fear, handleSubmitRating }) {
  let inputId = React.useId();
  const [inputValue, setInputValue] = React.useState(1);

  return (
    <>
      <p>Rate your fear of {fear} on a scale from 1 to 10.</p>
      <p>Current fear: {inputValue}</p>
      <form onSubmit={handleSubmitRating}>
        <label htmlFor={inputId}>Fear scale</label>
        <input
          id={inputId}
          required={true}
          type="range"
          min="1"
          max="10"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        ></input>
        <button className={styles.button} type="submit">
          Continue
        </button>
      </form>
    </>
  );
}
