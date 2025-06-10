'use client'

import { useEffect, useState } from 'react';
import { useTheme } from './themeProvider';


const GITHUB_USERNAME = 'sjKodehode'; // ← endre dette

export default function GitHubRepos() {
    const { colors } = useTheme()

    const background = colors[1]
    const primary = colors[0]
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        if (!res.ok) throw new Error('Noe gikk galt');
        const data = await res.json();

        // Hent stjerner og seneste commit per repo (kun for demo, unngå for mange kall)
        const withDetails = await Promise.all(data.slice(0, 6).map(async repo => {
          const commitsRes = await fetch(repo.commits_url.replace('{/sha}', ''));
          const commits = await commitsRes.json();
          return {
            name: repo.name,
            html_url: repo.html_url,
            stars: repo.stargazers_count,
            lastCommit: commits[0]?.commit?.message || 'Ingen commits',
          };
        }));

        setRepos(withDetails);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchRepos();
  }, []);

  if (error) return <p>Feil: {error}</p>;

  return (
    <section style={{
        backgroundColor: background,
        color: primary,
    }} className="py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Mine GitHub-prosjekter</h2>
      <ul className="space-y-4 flex gap-8 justify-center">
        {repos.map((repo, idx) => (
          <li key={idx} className="p-4 rounded-xl border" style={{
            borderColor: primary,
          }}>
            <a href={repo.html_url} className="text-xl font-semibold underline" target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p className="text-sm mt-1">⭐ {repo.stars} &middot; Sist commit: {repo.lastCommit}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
