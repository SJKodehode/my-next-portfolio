'use client'

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTheme } from '../themeProvider';
import GitHubRepos from './gitHubRepos';
import CodeFactorBadges from './badges/CodeFactorBadges';
import QltyBadges from './badges/QltyBadges';

const LANG_API = '/api/github-languages';
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57'];

export default function GitHubLanguagesChart() {
  const [languageData, setLanguageData] = useState([]);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    async function fetchLanguages() {
      try {
        const res = await fetch(LANG_API);
        if (!res.ok) throw new Error('Klarte ikke hente språkdata');
        const data = await res.json();
        // data er [{ language, bytes }, …]
        const chartData = data.map(({ language, bytes }) => ({
          name: language,
          value: bytes
        }));
        setLanguageData(chartData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchLanguages();
  }, []);

  if (error) return <p className="text-red-500">Feil: {error}</p>;

  return (
    <section
      className="py-24 flex flex-col items-center"
      style={{
        backgroundColor: colors[1],
        color: colors[0]
      }}
    >
      <div className="md:max-w-7xl flex flex-col items-center md:flex-row ">
        <div>
          <h2 className="text-3xl text-center font-bold mb-6">Språkstatistikk fra GitHub:</h2>
          {languageData.length > 0 ? (
            <PieChart width={375} height={375}>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {languageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <p>Laster språkdata...</p>
          )}
        </div>
        <GitHubRepos />
      </div>
      <div className="flex md:flex-row flex-col gap-6 mt-8">
        <CodeFactorBadges />
        <QltyBadges />
      </div>
    </section>
  );
}
