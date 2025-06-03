'use client';

import { useEffect } from 'react';
import { palettes } from '../lib/palettes';
import { applyPalette } from '../lib/theme';

export default function ThemeInitializer() {
  useEffect(() => {
    const saved = localStorage.getItem('themePalette');
    const pick  = palettes.find(p => p.id === saved) || palettes[0];
    applyPalette(pick);
  }, []);
  return null;
}
