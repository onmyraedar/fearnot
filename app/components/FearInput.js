'use client';

import React from 'react';

import styles from '../styles/FearInput.module.css';

export default function FearInput({ handleSubmitFear }) {
  let inputId = React.useId();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <form onSubmit={handleSubmitFear}>
      <label htmlFor={inputId}>Enter your fear:</label><br />
      <input
        className={styles.input}
        id={inputId}
        required={true}
        placeholder="spiders"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      ></input>
      <button className={styles.button} type="submit">
        Continue
      </button>
    </form>
  );
}
