'use client';

import React from 'react';

export default function FearInput() {
  let inputId = React.useId();
  const [fear, setFear] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    console.log({ fear });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId}>Enter your fear:</label>
      <input
        id={inputId}
        required={true}
        placeholder="Spiders"
        value={fear}
        onChange={(event) => setFear(event.target.value)}
      ></input>
    </form>
  );
}
