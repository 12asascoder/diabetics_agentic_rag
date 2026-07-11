"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileText, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

export default function ProtocolsPage() {
  const { protocols, setProtocols } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/protocols', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProtocols(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProtocols();
  }, [setProtocols]);

  const columns = [
    { header: 'Title', accessor: 'title' as const, render: (val: string) => <div className="font-medium text-foreground">{val}</div> },
    { header: 'Version', accessor: 'version' as const, render: (val: string) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">v{val}</span> },
    { 
      header: 'Status', 
      accessor: 'ethicsApprovalStatus' as const, 
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          val === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
          val === 'Rejected' ? 'bg-red-50 text-red-700' :
          'bg-amber-50 text-amber-700'
        }`}>
          {val}
        </span>
      )
    },
    { header: 'Sample Size', accessor: 'sampleSize' as const },
    { 
      header: 'Last Updated', 
      accessor: 'updatedAt' as const,
      render: (val: string) => val ? format(new Date(val), 'MMM d, yyyy') : ''
    }
  ];

  if (loading) {
    return (
      <div className="p-8 w-full max-w-7xl mx-auto space-y-6">
        <div><h1 className="text-2xl font-bold font-heading">Protocols</h1></div>
        <LoadingSkeleton type="table" count={4} />
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 animate-fade-in font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <FileText className="text-primary" size={24} />
            Research Protocols
          </h1>
          <p className="text-secondary text-sm mt-1">Manage clinical workflows, methodologies, and ethics approvals.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          <PlusCircle size={16} />
          New Protocol
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100">{error}</div>}

      {protocols.length === 0 ? (
        <EmptyState 
          icon={FileText}
          title="No Protocols Created"
          description="Create your first research protocol to define methodology, inclusion criteria, and workflow."
          primaryActionText="Create Protocol"
          onPrimaryAction={() => console.log('Create protocol')}
        />
      ) : (
        <DataTable data={protocols} columns={columns} searchKeys={['title', 'ethicsApprovalStatus']} />
      )}
    </div>
  );
}
