import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Navya — Job Discovery',
  description: 'Privacy-first job discovery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-stone-900">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <header className="flex items-center justify-between mb-6">
            <div className="font-semibold text-xl">
              <span className="text-brand">N</span>avya
            </div>
            <nav className="text-sm space-x-4">
              <a href="/onboarding" className="hover:underline">Onboarding</a>
              <a href="/legal/terms" className="hover:underline">Terms</a>
              <a href="/legal/privacy" className="hover:underline">Privacy</a>
            </nav>
          </header>
          {children}
          <footer className="mt-12 text-xs text-stone-500">
            Built with ❤️ — Please use responsibly and within source terms.
          </footer>
        </div>
      </body>
    </html>
  );
}
