"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Brain, FileText, PlusCircle, Search } from 'lucide-react';

export default function WorkspacesPage() {
  const { workspaces, setWorkspaces, setCurrentWorkspace } = useStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would use the real auth token
    const fetchWorkspaces = async () => {
      try {
        // Mock data for UI demonstration until API is fully connected with Auth
        setWorkspaces([
          { _id: '1', title: 'GLP-1 Agonists Efficacy', diseaseCategory: 'Type 2 Diabetes' },
          { _id: '2', title: 'Metformin Long Term Data', diseaseCategory: 'Type 2 Diabetes' }
        ]);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkspaces();
  }, [setWorkspaces]);

  const handleSelectWorkspace = (workspace: any) => {
    setCurrentWorkspace(workspace);
    router.push('/workspaces/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="text-blue-500" />
              Research Workspaces
            </h1>
            <p className="text-gray-400 mt-2">Manage your clinical investigations and knowledge bases.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <PlusCircle size={20} />
            New Workspace
          </button>
        </header>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading workspaces...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => (
              <div 
                key={ws._id} 
                onClick={() => handleSelectWorkspace(ws)}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/10 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{ws.title}</h3>
                <p className="text-gray-400 text-sm">{ws.diseaseCategory}</p>
                <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
                  <span className="text-gray-500">Updated today</span>
                  <span className="text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open <Search size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
