"use client";

import React from 'react';
import { 
  Menu,
  LayoutGrid,
  ChevronDown
} from 'lucide-react';

export default function DocumentLibrary() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex font-sans gap-8">
      
      {/* Left Sidebar: Filters */}
      <div className="w-64 shrink-0 flex flex-col h-full overflow-y-auto pr-2">
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <h3 className="font-heading font-bold text-primary">Filters</h3>
          <button className="text-xs font-label text-secondary hover:text-primary transition-colors">Clear All</button>
        </div>

        {/* Disease Target */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Disease Target</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-primary bg-primary flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-sm font-medium text-primary">Type 1 Diabetes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-primary bg-primary flex items-center justify-center">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span className="text-sm font-medium text-primary">Type 2 Diabetes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-gray-300 bg-white group-hover:border-primary transition-colors"></div>
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">Gestational</span>
            </label>
          </div>
        </div>

        {/* Study Design */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Study Design</h4>
          <div className="w-full flex items-center justify-between bg-white border border-gray-200 text-secondary p-2.5 rounded-md cursor-pointer hover:border-gray-300">
            <span className="text-sm">All Designs</span>
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Drug Class */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Drug Class</h4>
          <input 
            type="text" 
            placeholder="Search classes..." 
            className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary mb-4"
          />
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-gray-300 bg-white group-hover:border-primary transition-colors"></div>
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">SGLT2 Inhibitors</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-gray-300 bg-white group-hover:border-primary transition-colors"></div>
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">GLP-1 RAs</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-gray-300 bg-white group-hover:border-primary transition-colors"></div>
              <span className="text-sm text-secondary group-hover:text-primary transition-colors">DPP-4 Inhibitors</span>
            </label>
          </div>
        </div>

        {/* Publication Year */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Publication Year</h4>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Min" 
              className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-center"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="text" 
              placeholder="Max" 
              className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary text-center"
            />
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
        
        {/* Table Header Controls */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <span className="text-sm font-label text-secondary">2,451 Documents</span>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm text-secondary font-medium">Sort by:</span>
              <span className="text-sm font-bold text-primary group-hover:underline">Relevance</span>
              <ChevronDown size={14} className="text-primary" />
            </div>
          </div>
          <div className="flex gap-2 text-gray-400">
            <button className="p-1 text-primary hover:bg-gray-100 rounded transition-colors"><Menu size={20} /></button>
            <button className="p-1 hover:bg-gray-100 hover:text-primary rounded transition-colors"><LayoutGrid size={20} /></button>
          </div>
        </div>

        {/* Table Data */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="py-3 px-6 w-12"><div className="w-4 h-4 rounded border border-gray-300 bg-white"></div></th>
                <th className="py-3 px-6 text-xs font-label tracking-widest text-secondary uppercase font-medium">Title</th>
                <th className="py-3 px-6 text-xs font-label tracking-widest text-secondary uppercase font-medium">Authors</th>
                <th className="py-3 px-6 text-xs font-label tracking-widest text-secondary uppercase font-medium">Journal</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6"><div className="w-4 h-4 rounded border border-gray-300 bg-white"></div></td>
                <td className="py-4 px-6 font-bold text-primary">Efficacy of SGLT2 Inhibitors in Early-Onset Type 2 Diabetes</td>
                <td className="py-4 px-6 text-secondary font-label">Chen, L., et al.</td>
                <td className="py-4 px-6 text-secondary font-label">The Lancet Diabetes</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6"><div className="w-4 h-4 rounded border border-gray-300 bg-white"></div></td>
                <td className="py-4 px-6 font-bold text-primary">Long-term Cardiovascular Outcomes with GLP-1 RAs</td>
                <td className="py-4 px-6 text-secondary font-label">Smith, J. R., et al.</td>
                <td className="py-4 px-6 text-secondary font-label">NEJM</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6"><div className="w-4 h-4 rounded border border-gray-300 bg-white"></div></td>
                <td className="py-4 px-6 font-bold text-primary">Microvascular Complications in Adolescent T1D Patients</td>
                <td className="py-4 px-6 text-secondary font-label">Martínez, A., Doe...</td>
                <td className="py-4 px-6 text-secondary font-label">Diabetes Care</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
