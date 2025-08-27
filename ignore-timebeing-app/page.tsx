'use client';

import { useState } from 'react';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  date_posted: string;
  source: string;
  apply_url: string;
  description?: string;
};

export default function HomePage() {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function search(p = 1) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&location=${encodeURIComponent(loc)}&page=${p}`);
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setJobs(data.results);
      setPage(p);
    } catch (e:any) {
      setError(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  function share(job: Job) {
    const text = `Job: ${job.title} at ${job.company}\n${job.apply_url}`;
    if (navigator.share) {
      navigator.share({ title: job.title, text, url: job.apply_url }).catch(()=>{});
    } else {
      // Fallback links
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }
  }

  return (
    <main>
      <div className="rounded-2xl p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-semibold mb-4">Find your next role</h1>
        <div className="grid md:grid-cols-[2fr_1fr_auto] gap-3">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Keyword (e.g., Product Manager)"
            className="border rounded-xl px-4 py-3 outline-brand/40"
          />
          <input
            value={loc}
            onChange={(e)=>setLoc(e.target.value)}
            placeholder="Location (e.g., Bangalore)"
            className="border rounded-xl px-4 py-3 outline-brand/40"
          />
          <button onClick={()=>search(1)} className="bg-brand text-white rounded-xl px-5">
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      <section className="mt-6 space-y-3">
        {jobs.map(job => (
          <article key={job.id} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg">{job.title}</h2>
                <p className="text-sm text-stone-600">{job.company} • {job.location}</p>
                <p className="text-xs text-stone-500 mt-1">Posted: {new Date(job.date_posted).toLocaleDateString()}</p>
                {job.description && <p className="text-sm mt-2 line-clamp-3">{job.description}</p>}
                <div className="mt-3 flex gap-3">
                  <a href={job.apply_url} target="_blank" className="text-brand underline">View / Apply</a>
                  <button onClick={()=>share(job)} className="text-stone-700 hover:underline">Share</button>
                </div>
              </div>
              <span className="text-xs text-stone-500">{job.source}</span>
            </div>
          </article>
        ))}
      </section>

      {jobs.length > 0 && (
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
            onClick={()=>search(Math.max(1, page-1))}
            disabled={page<=1 || loading}
          >Prev</button>
          <div className="px-3 py-2">Page {page}</div>
          <button
            className="px-3 py-2 border rounded-lg disabled:opacity-50"
            onClick={()=>search(page+1)}
            disabled={loading}
          >Next</button>
        </div>
      )}
    </main>
  )
}
