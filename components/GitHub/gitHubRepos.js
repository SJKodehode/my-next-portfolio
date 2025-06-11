'use client'

import { useEffect, useState } from 'react';
import { useTheme } from '../themeProvider';

export default function GitHubRepos() {
  const { colors } = useTheme();
  const background = colors[1];
  const primary    = colors[0];

  const [repos, setRepos]   = useState([]);
  const [error, setError]   = useState(null);
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/github-repos');
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoad(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Henter prosjekter…</p>;
  if (error)   return <p className="text-red-500">Feil: {error}</p>;

  return (
    <section
      className="py-12"
      style={{ backgroundColor: background, color: primary }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Mine GitHub-prosjekter</h2>
      <ul className="flex flex-wrap justify-center gap-8">
        {repos.map((repo, idx) => (
          <li
            key={idx}
            className="p-4 rounded-xl border min-w-xs md:min-w-auto"
            style={{ borderColor: primary }}
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-semibold underline"
            >
              {repo.name}
            </a>
            <p className="text-sm mt-1">
              ⭐ {repo.stars} · Description: {repo.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
