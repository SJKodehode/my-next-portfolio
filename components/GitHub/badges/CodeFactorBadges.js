// components/CodeFactorBadges.js
'use client'

import React from 'react';

const repoRatings = [
  {
    name: 'calendar-web-app',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/calendar-web-app/badge',
  },
  {
    name: 'netonnet-website',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/netonnet-website/badge',
  },
  {
    name: 'craftsvilla-react',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/craftsvilla-react/badge',
  },
  {
    name: 'react-movie-tutorial',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/react-movie-tutorial/badge',
  },
  {
    name: 'js-color-scraper',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/js-color-scraper/badge',
  },
  {
    name: 'my-next-portfolio',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/my-next-portfolio/badge',
  },
  {
    name: 'nextjs-dashboard',
    badgeUrl: 'https://www.codefactor.io/repository/github/sjkodehode/nextjs-dashboard/badge',
  }
];

export default function CodeFactorBadges() {
  return (
    <section id="github-badges" className="py-12 flex flex-col items-center flex-wrap">
      <h2 className="text-3xl font-bold mb-6">CodeFactor Ratings</h2>
      <div className="flex flex-wrap justify-center max-w-3xl gap-4">
        {repoRatings.map(({ name, badgeUrl }) => (
          <a
            key={name}
            href={`https://www.codefactor.io/repository/github/sjkodehode/${name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={badgeUrl}
              alt={`${name} quality badge`}
              className="h-10"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
