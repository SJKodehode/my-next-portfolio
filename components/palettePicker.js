'use client';

import { useTheme } from './themeProvider';

export default function PalettePicker() {
  const { palettes, selected, selectPalette } = useTheme();

  return (
    <>
    <div className="flex flex-col gap-4 bg-amber-50 shadow-lg p-8 rounded-2xl w-fit max-w-4xl">
      {palettes.map(p => (
          <div
          key={p.id}
          onClick={() => selectPalette(p)}
          className={`cursor-pointer p-1 rounded ${
            p.id === selected.id ? 'ring ring-offset-2 ring-accent' : ''
        }`}
        >
          <div className="flex overflow-hidden rounded">
            {[p.background, p.primary, p.secondary, p.accent].map((c, i) => (
                <div
                key={i}
                style={{ backgroundColor: c }}
                className="w-5 h-5"
                />
            ))}
          </div>
          <p className="text-xs mt-1">{p.name}</p>
        </div>
      ))}
    </div>
    <p className="mt-2 text-sm text-gray-500 bg-amber-50 p-3 rounded-xl flex justify-center w-fit">
        Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">Space</kbd> to shuffle roles within your current palette.
    </p>
    </>
  );
}
