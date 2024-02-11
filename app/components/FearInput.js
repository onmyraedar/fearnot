'use client';

import React from 'react';

export default function FearInput({ handleSubmitFear }) {
  let inputId = React.useId();
  const [inputValue, setInputValue] = React.useState('');

  return (
    <form onSubmit={handleSubmitFear}>
      <label htmlFor={inputId}>Enter your fear:</label><br />
      <input
        id={inputId}
        required={true}
        placeholder="Spiders"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      ></input>
      <button type="submit">
        Continue
      </button>
    </form>
  );
}
