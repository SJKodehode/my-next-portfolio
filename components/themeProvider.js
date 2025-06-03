'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { palettes } from '../lib/palettes';
import { applyPalette } from '../lib/theme';

const ThemeContext = createContext();
export function useTheme() { return useContext(ThemeContext); }

export default function ThemeProvider({ children }) {
  // 1) selected palette object
  const [selected, setSelected] = useState(palettes[0]);
  // 2) the **current** assignment of its 4 colors,
  //    [ background, primary, secondary, accent ]
  const [colors, setColors] = useState([
    palettes[0].background,
    palettes[0].primary,
    palettes[0].secondary,
    palettes[0].accent,
  ]);

  // on mount: load saved ID → setSelected + reset its colors
  useEffect(() => {
    const saved = localStorage.getItem('themePalette');
    const found = palettes.find(p => p.id === saved) || palettes[0];
    setSelected(found);
    setColors([
      found.background,
      found.primary,
      found.secondary,
      found.accent,
    ]);
  }, []);

  // whenever `colors` or `selected.id` changes → apply to DOM
  useEffect(() => {
    applyPalette({ 
      background: colors[0], 
      primary:    colors[1], 
      secondary:  colors[2], 
      accent:     colors[3],
      id:         selected.id 
    });
  }, [colors, selected.id]);

  // click‐to‐select a new palette → resets colors back to its defaults
  function selectPalette(p) {
    setSelected(p);
    setColors([ p.background, p.primary, p.secondary, p.accent ]);
  }

  // on SPACE → Fisher-Yates shuffle of `colors` array
  useEffect(() => {
    const onKey = e => {
      if (e.code === 'Space') {
        e.preventDefault();
        setColors(arr => {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <ThemeContext.Provider value={{ palettes, selected, selectPalette, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}
