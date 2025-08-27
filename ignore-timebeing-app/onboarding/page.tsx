'use client';

import { useState } from 'react';

export default function Onboarding() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit() {
    setMsg(null);
    const res = await fetch('/api/logConsent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, consentGiven: consent })
    });
    if (res.ok) setMsg('Onboarding complete. Thanks!');
    else setMsg('Failed to save. Please try again.');
  }

  return (
    <main className="bg-white rounded-2xl p-6 shadow-sm">
      <h1 className="text-xl font-semibold mb-4">Onboarding</h1>
      <div className="grid gap-3 max-w-md">
        <input className="border rounded-xl px-4 py-3" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} />
        <input className="border rounded-xl px-4 py-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" checked={consent} onChange={(e)=>setConsent(e.target.checked)} />
          <span>I agree to the <a href="/legal/terms" className="underline">Terms of Use</a> and <a href="/legal/privacy" className="underline">Privacy Policy</a>.</span>
        </label>
        <button onClick={submit} disabled={!consent || !email || !name} className="bg-brand text-white rounded-xl px-5 py-3 disabled:opacity-50">
          Save & Continue
        </button>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </main>
  );
}
