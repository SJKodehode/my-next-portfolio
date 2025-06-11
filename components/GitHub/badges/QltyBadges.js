// components/QltyBadges.js
'use client'

import React from 'react';
import { useTheme } from '@/components/themeProvider';

const qltyBadges = [
  {
    name: 'react-movie-tutorial',
    badgeUrl: 'https://qlty.sh/badges/a0886a33-caf1-4763-8afa-7c6b86dc76d4/maintainability.svg',
    projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/react-movie-tutorial',
  },
  {
    name: 'js-color-scraper',
    badgeUrl: 'https://qlty.sh/badges/76b7da0f-fa65-4e8b-aa79-0dca048346d3/maintainability.svg',
    projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/js-color-scraper',
  },
  {
    name: 'nextjs-dashboard',
    badgeUrl: 'https://qlty.sh/badges/01cdc9e7-0152-4ba9-b4f7-3b951c91358a/maintainability.svg',
    projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/nextjs-dashboard',
  },
  {
    name: 'my-next-portfolio',
    badgeUrl: 'https://qlty.sh/badges/31f88258-c183-4acd-8b26-8d5b195e657e/maintainability.svg',
    projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/my-next-portfolio',
  },
  {
    name: 'craftsvilla-react',
    badgeUrl: 'https://qlty.sh/badges/8ecbc90f-1878-4841-b6e7-9b43fc09a8c2/maintainability.svg',
    projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/craftsvilla-react',
  },
//   {
//     name: 'netonnet-website',
//     badgeUrl: 'https://qlty.sh/badges/30aa3243-8ef8-4fbe-aa65-b073b830db42/maintainability.svg',
//     projectUrl: 'https://qlty.sh/gh/SJKodehode/projects/netonnet-website',
//   },
];

export default function QltyBadges() {
    const { colors } = useTheme()
  return (
    <section id="qlty-badges" className="py-12 flex flex-col items-center flex-wrap">
      <h2 className="text-3xl font-bold mb-6">Maintainability Ratings</h2>
      <div className="flex flex-wrap justify-center max-w-3xl gap-4">
        {qltyBadges.map(({ name, badgeUrl, projectUrl }) => (
            <div 
            key={name}
            className='p-4 rounded-2xl min-w-3xs flex flex-col items-center justify-center' 
            style={{
            backgroundColor: colors[0],
            color: colors[1],
          }}>
            <p>{name}</p>
          <a
            
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={badgeUrl}
              alt={`${name} maintainability badge`}
              className="h-10"
            />
          </a>
          </div>
        ))}
      </div>
    </section>
  );
}
