'use client';

import React, { useState, useEffect } from 'react';
import * as motion from 'motion/react-client'; // for Motion v12.0
import { useTheme } from './themeProvider';

export default function Navbar() {
  const { palettes, selected, selectPalette } = useTheme();

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
    hidden: { x: '-120%' },
    visible: { x: '0%' },
  };

  return (
    <div>
      {showArrow && !isExpanded && (
        <motion.button
          onClick={() => setIsExpanded(true)}
          initial={{ scale: 1, x: -20 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="
            fixed left-0 top-1/2 transform -translate-y-1/2
            z-50 p-2 rounded-r-md bg-white/80 backdrop-blur-sm
            border border-gray-200
          "
        >
          {/* Simple SVG arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-4 text-gray-600"
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
          fixed left-0 bottom-0 sm:w-24 w-full z-40
          flex-wrap overflow-hidden bg-white backdrop-blur-lg ml-4 mr-4 h-fit
          border-r border-gray-200
          grid grid-cols-5 sm:flex sm:flex-col items-center
          py-8 gap-5 sm:h-fit px-3 text-gray-600 font-medium rounded-[2.6rem] my-4
        "
      >
        {palettes.map((p) => {
          const isSelected = p.id === selected.id;

          return (
            <motion.button
              key={p.id}
              onClick={() => selectPalette(p)}
              initial={{ opacity: 0.75, scale: 1, x:0 }}
              animate={{
                opacity: isSelected ? 1 : 0.75,
                scale: isSelected ? 1.15 : 1,
                x: isSelected ? 2 : 0,
              }}
              whileHover={{
                opacity: 1,
                scale: isSelected ? 1.15 : 1.1,
                x: 4,
                
              }}
              transition={{ type: 'spring', stiffness: 100, duration: 0.2 }}
              className="
                flex flex-col overflow-hidden w-fit rounded
              "
            >
              {[p.background, p.primary, p.secondary, p.accent].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-2 self-center"
                  style={{ backgroundColor: c }}
                />
              ))}
              <p
                className="text-xs mt-1"
                style={{ fontWeight: isSelected ? 600 : 400 }}
              >
                {p.name}
              </p>
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );
}
