

// pages/api/jobSearch.js
export default async function handler(req, res) {
  try {
    const { query } = req;
    // Accept both q or query for compatibility with different frontends
    const q = (query.q || query.query || '').trim();
    const location = (query.location || '').trim();
    const page = parseInt(query.page || '1', 10) || 1;

    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;
    const country = process.env.ADZUNA_COUNTRY || 'IN';

    if (!appId || !appKey) {
      return res.status(200).json({ results: [], error: 'Adzuna credentials not set in environment' });
    }

    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      what: q,
      where: location,
      results_per_page: '20',
    });

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?${params.toString()}`;

    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      const txt = await apiRes.text();
      return res.status(502).json({ results: [], error: `Adzuna ${apiRes.status}: ${txt}` });
    }

    const data = await apiRes.json();

    const results = (data.results || []).map((j) => ({
      // normalize so frontend components can rely on these fields
      id: j.id ?? `${j.title}_${Math.random().toString(36).slice(2,8)}`,
      title: j.title ?? 'Untitled',
      company: { display_name: (j.company && j.company.display_name) || j.company || 'Unknown' },
      location: { display_name: (j.location && j.location.display_name) || j.location || '—' },
      created: j.created || j.created_at || null,
      redirect_url: j.redirect_url || j.apply_url || '',
      description: j.description || '',
      source: 'Adzuna'
    }));

    return res.status(200).json({ results });
  } catch (err) {
    console.error('jobSearch error', err);
    return res.status(500).json({ results: [], error: err?.message || 'Server error' });
  }
}
