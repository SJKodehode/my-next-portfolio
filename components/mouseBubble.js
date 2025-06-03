'use client';
import { useEffect, useState } from 'react';
import { useTheme } from './themeProvider';

export default function MouseBubble() {
  const { colors } = useTheme();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPressed, setIsPressed] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setIsPressed(true);
      setRippleKey(prev => prev + 1);
    };

    // på mouseup: merk at ikke lenger trykket
    // const onMouseUp = () => {
    //   setIsPressed(false);
    // };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onMouseDown);
    // window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onMouseDown);
    //   window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none rounded-full border-[3px] transition-transform duration-100 ease-out"
      style={{
        width: '90px',
        height: '90px',
        borderColor: colors[3],                      // Aksentfarge som kant
        backgroundColor: 'transparent',
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        zIndex: 9999,
      }}
    >
      {isPressed && (
        <span
          key={rippleKey}       
          className="ripple"
          style={{
            backgroundColor: colors[3] + '80', 

          }}
        />
      )}
    </div>
  );
}
