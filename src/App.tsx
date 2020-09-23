import React, { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Slider } from './components/Slider';

const App: React.FC = () => {
  const [ratio, setRatio] = useState(0.7333);

  return (
    <div className="App">
      <Header inputRatio={ratio} setRatio={setRatio}></Header>
      <Slider inputRatio={ratio}></Slider>
    </div>
  );
};

export default App;
