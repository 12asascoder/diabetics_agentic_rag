import Link from 'next/link';
import { Brain, ArrowRight, Activity, ShieldCheck, Database } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-blue-500/30">
      <header className="px-8 py-6 flex justify-between items-center border-b border-gray-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Brain className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Diabetes AI Platform
          </h1>
        </div>
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">Platform</Link>
          <Link href="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link>
          <Link href="/workspaces" className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
            Enter Platform <ArrowRight size={16} />
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800/50 mb-8 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Publication-Grade Research Engine v2.0
        </div>

        <h2 className="text-5xl md:text-7xl font-bold max-w-4xl tracking-tight mb-8 leading-tight">
          Accelerating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Diabetes Research</span> through Multi-Agent AI
        </h2>
        
        <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
          The next-generation clinical intelligence platform. Featuring hybrid RAG, hierarchical evidence extraction, and real-time knowledge graph generation.
        </p>

        <div className="flex gap-4">
          <Link href="/workspaces" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-blue-600/25 flex items-center gap-2">
            Launch Workspaces <ArrowRight size={18} />
          </Link>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-full font-medium transition-colors border border-gray-700">
            View Architecture
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl text-left w-full">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <Activity className="text-blue-400 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Multi-Agent Orchestration</h3>
            <p className="text-gray-400 text-sm">Specialized agents route queries, evaluate evidence quality, detect contradictions, and synthesize publication-ready drafts.</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <Database className="text-purple-400 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Vector & Graph Fusion</h3>
            <p className="text-gray-400 text-sm">Combines ChromaDB semantic similarity with explicit entity extraction to build navigable medical knowledge graphs.</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
            <ShieldCheck className="text-green-400 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Clinical Safety First</h3>
            <p className="text-gray-400 text-sm">Strict provenance tracking linking all generated claims directly to underlying document chunk IDs and metadata.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
