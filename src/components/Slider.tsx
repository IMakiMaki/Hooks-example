import React, { useMemo } from 'react';
import './Slider.css';
import { useSlider } from '../hooks/useSlider';

export const Slider: React.FC<{ inputRatio: number }> = (props) => {
  const { lineRef, draggerRef, handleMouseDown, positionLeft } = useSlider({
    inputRatio: props.inputRatio,
  });

  const SliderMemo = useMemo(
    () => (
      <div
        ref={draggerRef}
        style={{ left: positionLeft + 'px' }}
        onMouseDown={(e) => handleMouseDown(e)}
        className="slider-dragger"
      ></div>
    ),
    [draggerRef, handleMouseDown, positionLeft]
  );

  return (
    <div className="Slider">
      <div ref={lineRef} className="slider-line">
        {SliderMemo}
      </div>
      <div className="slider-ratio">{positionLeft}</div>
    </div>
  );
};
