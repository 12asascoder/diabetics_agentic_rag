import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function TreatmentIntelligence() {
  const comparisons = [
    { approach: 'GLP-1 Agonists', evidence: 'High', benefits: 'Weight loss, CV benefit', limitations: 'GI side effects, Cost' },
    { approach: 'SGLT2 Inhibitors', evidence: 'High', benefits: 'Heart failure reduction, Renal protection', limitations: 'UTI risk, DKA' },
    { approach: 'Metformin', evidence: 'Very High', benefits: 'Low cost, weight neutral', limitations: 'GI side effects, rare lactic acidosis' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#1a1a1e] text-slate-900 dark:text-slate-100 p-8 font-sans">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Treatment Intelligence</h1>
          <p className="text-slate-500 dark:text-slate-400">Agentic comparison of treatment approaches and evidence.</p>
        </div>
      </header>

      <main className="max-w-6xl w-full mx-auto">
        <Card className="bg-white dark:bg-[#232328] border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Comparing Type 2 Diabetes Pharmacotherapy</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-slate-800">
                  <TableHead className="w-[200px]">Approach</TableHead>
                  <TableHead>Evidence Strength</TableHead>
                  <TableHead>Clinical Benefits</TableHead>
                  <TableHead className="text-right">Limitations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisons.map((item, index) => (
                  <TableRow key={index} className="border-slate-100 dark:border-slate-800/50">
                    <TableCell className="font-medium">{item.approach}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        item.evidence.includes('High') 
                          ? 'text-emerald-600 border-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400' 
                          : 'text-amber-600 border-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400'
                      }>
                        {item.evidence}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">{item.benefits}</TableCell>
                    <TableCell className="text-right text-slate-600 dark:text-slate-400">{item.limitations}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
