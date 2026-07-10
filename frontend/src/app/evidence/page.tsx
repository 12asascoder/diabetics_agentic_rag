import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function EvidenceGraph() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1e] text-slate-900 dark:text-slate-100 p-8 font-sans">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evidence Graph</h1>
          <p className="text-slate-500 dark:text-slate-400">Visual mapping of clinical pathways and findings.</p>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto">
        <Card className="bg-white dark:bg-[#232328] border-slate-200 dark:border-slate-800 h-[600px] flex items-center justify-center">
          <CardContent className="text-center">
            <div className="flex flex-col items-center gap-8">
              <div className="px-6 py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200 dark:border-indigo-800 font-medium">
                Research Paper: GLP-1 Meta-Analysis
              </div>
              <div className="w-px h-12 bg-slate-300 dark:bg-slate-700"></div>
              <div className="px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 font-medium">
                Clinical Finding: Reduced HbA1c
              </div>
              <div className="w-px h-12 bg-slate-300 dark:bg-slate-700"></div>
              <div className="px-6 py-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800 font-medium">
                Treatment Approach: GLP-1 Agonist
              </div>
              <div className="w-px h-12 bg-slate-300 dark:bg-slate-700"></div>
              <div className="px-6 py-3 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800 font-medium">
                Outcome: Cardiovascular Protection
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
