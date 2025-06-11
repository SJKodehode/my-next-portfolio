// app/api/github-repos/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const USER = 'sjKodehode';
const CACHE_PATH = path.join(process.cwd(), '.next', 'github_repos_cache.json');
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 timer

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
  return res.json();
}

export async function GET() {
  // 1) Prøv cache
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const { timestamp, data } = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'));
      if (Date.now() - timestamp < CACHE_DURATION) {
        return NextResponse.json(data);
      }
    }
  } catch (e) {
    console.warn('Could not read cache:', e);
  }

  // 2) Hent repo‐liste og detaljer
  try {
    const repos = await fetchJSON(`https://api.github.com/users/${USER}/repos?sort=updated&per_page=6`);
    
    const enriched = await Promise.all(repos.map(async repo => {
      // Hent siste commit
      let lastCommit = 'Ingen commits';
      try {
        const commits = await fetchJSON(repo.commits_url.replace('{/sha}', '?per_page=1'));
        if (Array.isArray(commits) && commits.length) {
          lastCommit = commits[0].commit.message;
        }
      } catch (_){}

      return {
        name:       repo.name,
        html_url:   repo.html_url,
        stars:      repo.stargazers_count,
        lastCommit,
      };
    }));

    // 3) Cache og return
    fs.writeFileSync(
      CACHE_PATH,
      JSON.stringify({ timestamp: Date.now(), data: enriched })
    );
    return NextResponse.json(enriched);

  } catch (err) {
    console.error('GitHub repos error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
