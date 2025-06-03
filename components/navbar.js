'use client';

import { useTheme } from './themeProvider';

export default function Navbar() {
  const { palettes, selected, selectPalette } = useTheme();

  return (
    <nav
      className="
        fixed left-0 bottom-0 sm:w-24 w-[100%] sm:mx-auto flex-wrap
        bg-white 
        backdrop-blur-lg
        border-r border-gray-200
        grid grid-cols-5 sm:flex sm:flex-col items-center py-8 gap-5 sm:h-full px-3 text-gray-600 font-medium 
        overflow-y-auto
      "
    >
      {palettes.map(p => (
        <button
          key={p.id}
          onClick={() => selectPalette(p)}
          className={`
            flex flex-col overflow-hidden rounded
            ${p.id === selected.id ? 'ring-2 ring-offset-1 ring-accent' : ''}
            focus:outline-none
          `}
        >
          {[p.background, p.primary, p.secondary, p.accent].map((c, i) => (
            <div
              key={i}
              className="w-8 h-2 self-center"
              style={{ backgroundColor: c }}
            />
            
          ))}
          <p className="text-xs mt-1">{p.name}</p>
        </button>
      ))}
    </nav>
  );
}
