// app/api/github-languages/route.js
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24 timer

const USER = 'SJKodehode';
const TOKEN = process.env.GITHUB_TOKEN;

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
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
    // Hent alle repoer (opp til 100)
    const repos = await fetchJSON(
      `https://api.github.com/users/${USER}/repos?per_page=100`
    );

    // Akkumuler språkbytes
    const totals = {};
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const langs = await fetchJSON(repo.languages_url);
          for (const [lang, bytes] of Object.entries(langs)) {
            totals[lang] = (totals[lang] || 0) + bytes;
          }
        } catch (e) {
          console.warn(`Failed for ${repo.name}: ${e.message}`);
        }
      })
    );

    // Omformater til array for klienten
    const result = Object.entries(totals).map(([language, bytes]) => ({
      language,
      bytes
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error('GitHub fetch error:', err);
    return NextResponse.json(
      { error: err.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
