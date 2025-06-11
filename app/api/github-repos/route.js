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
    // Hent opp til 100 repos
    const repos = await fetchJSON(
      `https://api.github.com/users/${USER}/repos?per_page=10`
    );

    // Pakk ut bare det klienten trenger
    const result = repos.map(repo => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      fork: repo.fork
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
