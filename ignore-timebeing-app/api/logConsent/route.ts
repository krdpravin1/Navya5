import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  consentGiven: z.boolean()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { error: pErr } = await supabaseAdmin
      .from('profiles')
      .upsert({ name: data.name, email: data.email })
    if (pErr) throw pErr;

    const { error: cErr } = await supabaseAdmin
      .from('consents')
      .insert({ user_email: data.email, consent_given: data.consentGiven });
    if (cErr) throw cErr;

    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
