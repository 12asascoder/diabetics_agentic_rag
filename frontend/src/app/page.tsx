import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Activity, BrainCircuit, Database } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1e] text-slate-900 dark:text-slate-100 p-8 font-sans">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1e] dark:text-ivory">Diabetes Research Intelligence Platform</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Agentic Retrieval-Augmented Clinical Decision Support</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="text-indigo-600 border-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300">
            System Online
          </Badge>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/explorer" className="block transition-transform hover:-translate-y-1">
          <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 bg-white dark:bg-[#232328] shadow-sm">
            <CardHeader>
              <FileText className="w-8 h-8 text-indigo-500 mb-2" />
              <CardTitle>Document Explorer</CardTitle>
              <CardDescription>Browse parsed clinical trials and datasets.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-light">142</p>
              <p className="text-xs text-slate-400">Indexed Documents</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/assistant" className="block transition-transform hover:-translate-y-1">
          <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 bg-white dark:bg-[#232328] shadow-sm">
            <CardHeader>
              <BrainCircuit className="w-8 h-8 text-indigo-500 mb-2" />
              <CardTitle>AI Research Assistant</CardTitle>
              <CardDescription>Query your knowledge base with Agentic RAG.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-light">Ready</p>
              <p className="text-xs text-slate-400">Multi-document reasoning active</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/treatment" className="block transition-transform hover:-translate-y-1">
          <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 bg-white dark:bg-[#232328] shadow-sm">
            <CardHeader>
              <Activity className="w-8 h-8 text-indigo-500 mb-2" />
              <CardTitle>Treatment Intelligence</CardTitle>
              <CardDescription>Compare approaches and outcomes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-light">12</p>
              <p className="text-xs text-slate-400">Active comparisons</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/evidence" className="block transition-transform hover:-translate-y-1">
          <Card className="h-full border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 bg-white dark:bg-[#232328] shadow-sm">
            <CardHeader>
              <Database className="w-8 h-8 text-indigo-500 mb-2" />
              <CardTitle>Evidence Graph</CardTitle>
              <CardDescription>Visualize research findings and pathways.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-light">3.4k</p>
              <p className="text-xs text-slate-400">Evidence Nodes</p>
            </CardContent>
          </Card>
        </Link>
      </main>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Research Activity</h2>
        <div className="bg-white dark:bg-[#232328] border border-slate-200 dark:border-slate-800 rounded-lg p-6">
          <div className="space-y-4">
            {[
              { title: 'GLP-1 vs SGLT2i Outcomes', type: 'Query', time: '2 hours ago' },
              { title: 'UKPDS 33 Long-term Follow-up', type: 'Document Processed', time: '5 hours ago' },
              { title: 'Cardiovascular Risk Meta-analysis', type: 'Treatment Comparison', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-slate-500">{activity.type}</p>
                </div>
                <span className="text-sm text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
