import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const schema = z.object({ email: z.string().email() });

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    // Delete from child tables first (on cascade helps if set)
    await supabaseAdmin.from('events').delete().eq('user_email', email);
    await supabaseAdmin.from('consents').delete().eq('user_email', email);
    await supabaseAdmin.from('profiles').delete().eq('email', email);

    return NextResponse.json({ ok: true });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
