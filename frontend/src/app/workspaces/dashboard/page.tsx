"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Activity, BookOpen, Upload, ShieldAlert } from 'lucide-react';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import axios from 'axios';

export default function WorkspaceDashboard() {
  const { currentWorkspace, agentStep, setAgentStep } = useStore();
  const router = useRouter();
  
  const [query, setQuery] = useState('');
  const [report, setReport] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // If accessed directly without a workspace, send back
  if (!currentWorkspace) {
    if (typeof window !== 'undefined') router.push('/workspaces');
    return null;
  }

  const handleResearchQuery = async () => {
    if (!query) return;
    
    setIsProcessing(true);
    setAgentStep('planning');
    setReport('');
    
    try {
      // Simulate step-by-step progress for UX
      setTimeout(() => setAgentStep('retrieval'), 1500);
      setTimeout(() => setAgentStep('analysis'), 3000);
      setTimeout(() => setAgentStep('drafting'), 4500);
      
      const res = await axios.post('http://localhost:5000/api/agents/research', {
        query,
        workspaceId: currentWorkspace._id
      }, { withCredentials: true });
      
      setReport(res.data.finalReport);
      setAgentStep('completed');
    } catch (error) {
      console.error(error);
      setAgentStep('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/workspaces')} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">{currentWorkspace.title}</h1>
            <p className="text-sm text-gray-400">Disease Category: {currentWorkspace.diseaseCategory}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Upload size={16} />
            Upload Literature
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Multi-Agent Interaction */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" />
              Clinical Multi-Agent Orchestrator
            </h2>
            
            <div className="flex-1 overflow-y-auto mb-4 bg-gray-900/50 rounded-lg p-4 font-mono text-sm border border-gray-700/50">
              {agentStep === 'idle' && <p className="text-gray-500">Awaiting research query...</p>}
              
              {agentStep !== 'idle' && (
                <div className="flex flex-col gap-3 text-gray-300">
                  <div className={`flex items-center gap-2 ${agentStep === 'planning' ? 'text-blue-400 animate-pulse' : 'text-green-500'}`}>
                    <span>[Orchestrator] Planning retrieval strategy...</span>
                  </div>
                  {['retrieval', 'analysis', 'drafting', 'completed', 'error'].includes(agentStep) && (
                    <div className={`flex items-center gap-2 ${agentStep === 'retrieval' ? 'text-blue-400 animate-pulse' : 'text-green-500'}`}>
                      <span>[Retrieval Agent] Querying Vector Store & Katzilla...</span>
                    </div>
                  )}
                  {['analysis', 'drafting', 'completed', 'error'].includes(agentStep) && (
                    <div className={`flex items-center gap-2 ${agentStep === 'analysis' ? 'text-blue-400 animate-pulse' : 'text-green-500'}`}>
                      <span>[Analysis Agent] Evaluating evidence quality & detecting contradictions...</span>
                    </div>
                  )}
                  {['drafting', 'completed', 'error'].includes(agentStep) && (
                    <div className={`flex items-center gap-2 ${agentStep === 'drafting' ? 'text-blue-400 animate-pulse' : 'text-green-500'}`}>
                      <span>[Report Agent] Synthesizing final publication draft...</span>
                    </div>
                  )}
                </div>
              )}
              
              {report && (
                <div className="mt-8 pt-4 border-t border-gray-700">
                  <div className="bg-blue-900/20 text-blue-300 p-3 rounded mb-4 text-xs flex items-start gap-2">
                    <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                    <p>All AI-generated synthesis is derived from ingested documents. Review citations carefully before clinical application.</p>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a clinical question against the workspace..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 text-gray-100 placeholder-gray-500 transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleResearchQuery()}
                disabled={isProcessing}
              />
              <button 
                onClick={handleResearchQuery}
                disabled={isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {isProcessing ? 'Processing...' : <><Send size={18} /> Research</>}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visualizers */}
        <div className="flex flex-col gap-6">
          <KnowledgeGraph />
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex-1">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="text-purple-500" />
              Workspace Documents
            </h2>
            <div className="space-y-3">
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-700/50 text-sm">
                <p className="font-medium">GLP-1_Efficacy_Trial.pdf</p>
                <p className="text-xs text-gray-400 mt-1">Processed • 420 chunks extracted</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg border border-gray-700/50 text-sm">
                <p className="font-medium">Metformin_Meta_Analysis.pdf</p>
                <p className="text-xs text-gray-400 mt-1">Processed • 128 chunks extracted</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
