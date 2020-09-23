import React from 'react';
import './Header.css';

export const Header: React.FC<{ inputRatio: number; setRatio: (ratio: number) => void }> = (
  props
) => {
  return (
    <div className="Header">
      <button onClick={() => props.setRatio(0)}>0</button>
      <button onClick={() => props.setRatio(0.5)}>0.5</button>
      <button onClick={() => props.setRatio(1)}>1</button>
      <div className="number">{props.inputRatio}</div>
    </div>
  );
};
