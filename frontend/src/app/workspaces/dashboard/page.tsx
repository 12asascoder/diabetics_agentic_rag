"use client";

import React from 'react';
import { 
  FileUp, 
  FileText, 
  Microscope, 
  BookOpen, 
  Activity, 
  ArrowRight,
  FolderOpen,
  Maximize2,
  History,
  CheckCircle2,
  RefreshCw,
  UploadCloud,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function WorkspaceDashboard() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col font-sans">
      
      {/* Header Area */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary mb-1">Workspace Overview</h1>
          <p className="text-secondary text-sm">Monitor your active research, evidence synthesis, and recent updates.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-primary rounded font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <FileUp size={16} />
            Upload Study
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary border border-primary text-white rounded font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm">
            <FileText size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-4 top-6 opacity-10 text-primary">
            <Microscope size={48} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Active Trials Monitored</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-heading font-bold text-primary leading-none">142</span>
            <span className="flex items-center gap-1 bg-tertiary text-white text-xs font-bold px-2 py-0.5 rounded">
              <TrendingUp size={12} /> +12
            </span>
          </div>
          <p className="text-sm text-secondary">Across 3 major therapeutic areas.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-4 top-6 opacity-10 text-primary">
            <BookOpen size={48} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Recent Publications</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-heading font-bold text-primary leading-none">87</span>
            <span className="bg-gray-100 text-secondary text-xs font-bold px-2 py-0.5 rounded border border-gray-200">
              This Month
            </span>
          </div>
          <p className="text-sm text-secondary">15 pending review by agents.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-4 top-6 opacity-10 text-primary">
            <Activity size={48} strokeWidth={1.5} />
          </div>
          <p className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Evidence Synthesis</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-heading font-bold text-primary leading-none">94%</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mb-3 mt-2">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: '94%' }}></div>
          </div>
          <p className="text-sm text-secondary">Current meta-analysis progress.</p>
        </div>

      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-8">
        
        {/* Left Column (Spans 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Research Collections */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading font-bold text-primary">Research Collections</h2>
              <button className="text-sm font-label font-bold text-primary flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 p-2 rounded text-blue-600">
                    <FolderOpen size={20} className="fill-blue-100" />
                  </div>
                  <span className="bg-gray-100 text-secondary text-xs font-bold px-2 py-0.5 rounded border border-gray-200">
                    Active
                  </span>
                </div>
                <h3 className="font-heading font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">SGLT2 Inhibitor Meta-analysis</h3>
                <p className="text-xs text-secondary mb-6 leading-relaxed line-clamp-2">
                  Comprehensive review of cardiovascular outcomes in recent large-scale multinational RCTs.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 font-label">
                  <span className="flex items-center gap-1"><FileText size={12}/> 42 Docs</span>
                  <span>Updated 2h ago</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-100 p-2 rounded text-gray-600">
                    <FolderOpen size={20} className="fill-gray-200" />
                  </div>
                  <span className="bg-[#004225] text-white text-xs font-bold px-2 py-0.5 rounded">
                    Validated
                  </span>
                </div>
                <h3 className="font-heading font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">GLP-1 RA Renal Outcomes</h3>
                <p className="text-xs text-secondary mb-6 leading-relaxed line-clamp-2">
                  Synthesis of renal composite endpoints across major registries and real-world data cohorts.
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400 font-label">
                  <span className="flex items-center gap-1"><FileText size={12}/> 128 Docs</span>
                  <span>Updated 1d ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Entity Graph Placeholder matching Stitch design */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex-1 flex flex-col min-h-[250px]">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-primary">Entity Graph: SGLT2 Scope</h2>
              <button className="text-gray-400 hover:text-primary transition-colors">
                <Maximize2 size={18} />
              </button>
            </div>
            <div className="flex-1 bg-[#F8FAFC] border border-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
              {/* SVG Mock of the exact graph from Image 2 */}
              <svg width="400" height="150" viewBox="0 0 400 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M150 75L200 110L280 90L220 50L150 75Z" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M220 50L300 40" stroke="#CBD5E1" strokeWidth="1.5" />
                
                <circle cx="150" cy="75" r="4" fill="#002B5B" />
                <rect x="110" y="85" width="80" height="18" rx="2" fill="white" stroke="#E2E8F0" />
                <text x="150" y="97" fontSize="9" fontFamily="Jetbrains Mono, monospace" fill="#64748B" textAnchor="middle">Empagliflozin</text>
                
                <circle cx="200" cy="110" r="4" fill="#64748B" />
                <rect x="160" y="120" width="100" height="18" rx="2" fill="white" stroke="#E2E8F0" />
                <text x="210" y="132" fontSize="9" fontFamily="Jetbrains Mono, monospace" fill="#64748B" textAnchor="middle">EMPA-REG OUTCOME</text>
                
                <circle cx="220" cy="50" r="4" fill="#10B981" />
                <rect x="230" y="40" width="80" height="18" rx="2" fill="white" stroke="#E2E8F0" />
                <text x="270" y="52" fontSize="9" fontFamily="Jetbrains Mono, monospace" fill="#64748B" textAnchor="middle">Heart Failure</text>
                
                <circle cx="280" cy="90" r="4" fill="#002B5B" />
              </svg>
            </div>
          </div>

        </div>

        {/* Right Column: Agent Pipeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-heading font-bold text-primary">Agent Pipeline</h2>
            <History size={18} className="text-secondary" />
          </div>

          <div className="relative border-l border-gray-200 ml-3 space-y-8 pb-4">
            
            {/* Timeline Item 1 */}
            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-tertiary rounded-full shadow-[0_0_0_4px_#ecfdf5]"></div>
              <p className="text-xs font-label text-gray-400 mb-2">10 mins ago</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-tertiary" /> Parsing Complete
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Agent successfully extracted 42 entities from <br/>
                  <code className="bg-gray-200 text-gray-700 px-1 py-0.5 rounded text-[10px] font-mono mt-1 inline-block">Protocol_AX_v2.pdf</code>
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_0_4px_#eff6ff]"></div>
              <p className="text-xs font-label text-gray-400 mb-2">45 mins ago</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                  <RefreshCw size={16} className="text-primary animate-spin-slow" /> Synthesis in Progress
                </h4>
                <p className="text-xs text-secondary leading-relaxed mb-3">
                  Generating evidence summary for SGLT2 collection.
                </p>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div className="bg-primary h-1 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-300 rounded-full shadow-[0_0_0_4px_white]"></div>
              <p className="text-xs font-label text-gray-400 mb-2">2 hours ago</p>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-bold text-secondary flex items-center gap-2 mb-2">
                  <UploadCloud size={16} /> Batch Upload
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  User uploaded 5 trial registries to Inbox.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-gray-300 rounded-full shadow-[0_0_0_4px_white]"></div>
              <p className="text-xs font-label text-gray-400 mb-2">Yesterday</p>
              <div className="bg-red-50/50 border border-red-100 rounded-lg p-4">
                <h4 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-2">
                  <AlertCircle size={16} /> Extraction Flagged
                </h4>
                <p className="text-xs text-secondary leading-relaxed">
                  Low confidence on primary endpoint extraction. Requires manual review.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
