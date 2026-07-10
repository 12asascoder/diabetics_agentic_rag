import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, ChevronRight } from 'lucide-react';

export default function DocumentExplorer() {
  const documents = [
    { title: 'Clinical Trial Paper', status: 'Indexed', type: 'PDF', nodes: ['Abstract', 'Patient Population', 'Intervention', 'Results', 'Conclusion'] },
    { title: 'GLP-1 Meta-Analysis', status: 'Indexed', type: 'PDF', nodes: ['Introduction', 'Methods', 'Forest Plots', 'Discussion'] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1e] text-slate-900 dark:text-slate-100 p-8 font-sans">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Explorer</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage PageIndex-inspired document trees.</p>
        </div>
      </header>

      <main className="max-w-5xl">
        <div className="grid grid-cols-1 gap-6">
          {documents.map((doc, idx) => (
            <Card key={idx} className="bg-white dark:bg-[#232328] border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <CardTitle className="text-xl">{doc.title}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">{doc.type}</Badge>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400">
                    {doc.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Document Tree</h4>
                <div className="space-y-2">
                  {doc.nodes.map((node, nIdx) => (
                    <div key={nIdx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                      <span>{node}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
