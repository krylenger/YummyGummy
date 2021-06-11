import React from 'react';
import { instructionsContainer, instructionsContainer_number } from './CookingInstructions.css';

export default function CookingInstructions({ steps }) {
  return (
    <div>
      {steps.map(({ step, number }, index) => (
        <div key={index} className={instructionsContainer}>
          <p className={instructionsContainer_number}>{number}</p>
          <p>{step}</p>
        </div>
      ))}
    </div>
  );
}
