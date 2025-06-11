// app/api/github-repos/route.js
import { NextResponse } from 'next/server';

export const revalidate = 86400; // cache i 24 timer

const USER = 'SJKodehode';
const TOKEN = process.env.GITHUB_TOKEN;

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json(
      { error: 'Missing GitHub token on server' },
      { status: 500 }
    );
  }

  try {
    // Hent opptil 100 repos
    const repos = await fetchJSON(
      `https://api.github.com/users/${USER}/repos?per_page=100`
    );

    // Sorter synkende på størrelse (i KB)
    repos.sort((a, b) => b.size - a.size);

    // Ta kun de 10 største
    const top10 = repos.slice(0, 10);

    // Returner bare de feltene klienten trenger
    const result = top10.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      fork: repo.fork,
      size: repo.size,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error('GitHub repos error:', err);
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
