type AdzunaJob = {
  id: string;
  title: string;
  location: { display_name: string };
  company: { display_name: string };
  created: string;
  redirect_url: string;
  description?: string;
};

export async function fetchAdzuna(q: string, location: string, page: number) {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const country = process.env.ADZUNA_COUNTRY || 'IN';

  if (!appId || !appKey) {
    return { results: [], error: 'Adzuna credentials not set' };
  }

  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: '20',
    what: q || '',
    where: location || '',
    page: String(page || 1),
    content-type: 'application/json'
  });

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?${params.toString()}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text();
    return { results: [], error: `Adzuna error: ${res.status} ${text}` };
  }
  const data = await res.json();
  const results = (data.results as AdzunaJob[]).map(j => ({
    id: `adzuna_${j.id}`,
    title: j.title,
    company: j.company?.display_name || 'Unknown',
    location: j.location?.display_name || '—',
    date_posted: j.created,
    source: 'Adzuna',
    apply_url: j.redirect_url,
    description: j.description
  }));
  return { results };
}
