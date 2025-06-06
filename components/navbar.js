'use client';

import React, { useState, useEffect } from 'react';
import * as motion from 'motion/react-client'; // for Motion v12.0
import { useTheme } from './themeProvider';

export default function Navbar() {
  const { palettes, selected, selectPalette, colors } = useTheme();

  const [showArrow, setShowArrow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const halfWindow = window.innerHeight / 2;
      if (window.scrollY > halfWindow) {
        setShowArrow(true);
        setIsExpanded(false);
      } else {
        setShowArrow(false);
        setIsExpanded(true);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    hidden: { y: '200%' },
    visible: { y: '0%' },
  };
  
  return (
    <div className='flex justify-center w-dvw'>
      
      {showArrow && !isExpanded && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          initial={{ scale: 1, y: 60 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="
            fixed bottom-0 transform -translate-y-1/2
            z-50 p-2 rounded-md bg-white/80 backdrop-blur-sm
            border border-gray-200
          "
        >
          {/* Enkel SVG‐pil */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 rotate-270"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      )}

      <motion.nav
        initial={isExpanded ? 'visible' : 'hidden'}
        animate={isExpanded ? 'visible' : 'hidden'}
        variants={navVariants}
        transition={{ type: 'spring', stiffness: 100, duration: 0.2 }}
        className="
          fixed z-40
          bottom-8 flex flex-nowrap w-fit justify-center px-10 py-6 gap-8 scroll-smooth
           
           font-medium rounded-4xl snap-x shadow-2xl
        "
        style={{ backgroundColor: colors[1],
                 color: colors[0],
                 
        }}
      >
        
        {palettes.map((p) => {
          const isSelected = p.id === selected.id;

          return (
            <motion.button
              key={p.id}
              onClick={() => selectPalette(p)}
              initial={{ opacity: 0.90, scale: 1, x: 0 }}
              animate={{
                opacity: isSelected ? 1 : 0.90,
                scale: isSelected ? 1.15 : 1,
                y: isSelected ? -2 : 0,
              }}
              whileHover={{
                opacity: 1,
                scale: isSelected ? 1.15 : 1.1,
                y: -4,
              }}
              transition={{ type: 'spring', stiffness: 100, duration: 0.2 }}
              className="
                flex flex-col flex-shrink-0 items-center justify-center
                
              "
            >
              {[p.background, p.primary, p.secondary, p.accent].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-2"
                  style={{ backgroundColor: c }}
                />
              ))}
              <p
                className="text-xs mt-1 hidden text-center"
                style={{ fontWeight: isSelected ? 700 : 400 }}
              >
                {p.name}
              </p>
            </motion.button>
          );
        })}
       
      </motion.nav>

      {/* Skjuler scrollbar‐visningen ved å sette bredde/høyde til 0 */}
    </div>
  );
}
