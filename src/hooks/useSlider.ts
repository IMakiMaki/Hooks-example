import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';

type Params = {
  inputRatio: number;
};

export const useSlider = (params: Params) => {
  const [currentX, setCurrentX] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);

  const [isDown, setIsDown] = useState(false);
  const draggerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDown) {
        setCurrentX(event.pageX);
      }
    },
    [isDown]
  );

  const handleMouseUp = useCallback(() => {
    setIsDown(false);
  }, []);

  useLayoutEffect(() => {
    if (draggerRef.current?.style) {
      draggerRef.current.style.transition = 'all 0.3s';
    }
    setPositionLeft(
      params.inputRatio * (lineRef.current?.getBoundingClientRect().width || 0) -
        (draggerRef.current?.getBoundingClientRect().width || 0) / 2
    );
  }, [params.inputRatio]);

  useEffect(() => {
    if (isDown) {
      const draggerWidth = draggerRef.current?.getBoundingClientRect().width || 0;
      const lineWidth = lineRef.current?.getBoundingClientRect().width || 0;
      const maxLeft = lineWidth - draggerWidth / 2;
      const minLeft = -(draggerWidth / 2);
      const calcLeft = currentX - offsetLeft - (lineRef.current?.getBoundingClientRect().left || 0);
      setPositionLeft(Math.max(minLeft, Math.min(maxLeft, calcLeft)));
    }
  }, [currentX, isDown, offsetLeft]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (draggerRef.current?.style) {
      draggerRef.current.style.transition = '';
    }
    setIsDown(true);
    setCurrentX(event.pageX);
    setOffsetLeft(event.nativeEvent.offsetX);
  }

  return {
    handleMouseDown,
    positionLeft,
    draggerRef,
    lineRef,
  };
};
