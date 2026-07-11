"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { DetailDrawer } from '@/components/ui/DetailDrawer';
import { FileText, PlusCircle, Download, CheckCircle, FileSignature } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

export default function ProtocolsPage() {
  const { protocols, setProtocols } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<any | null>(null);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:5005/api/protocols', {
          withCredentials: true
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
        <DataTable 
          data={protocols} 
          columns={columns} 
          searchKeys={['title', 'ethicsApprovalStatus']} 
          onRowClick={(row) => setSelectedProtocol(row)}
        />
      )}

      <DetailDrawer
        isOpen={selectedProtocol !== null}
        onClose={() => setSelectedProtocol(null)}
        title="Protocol Details"
        subtitle={`Version ${selectedProtocol?.version}`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors">
              <Download size={16} /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors">
              <FileSignature size={16} /> Request Review
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded transition-colors">
              <CheckCircle size={16} /> Approve
            </button>
          </>
        }
      >
        {selectedProtocol && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Title</h4>
              <p className="text-foreground">{selectedProtocol.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Description</h4>
              <p className="text-foreground text-sm leading-relaxed">{selectedProtocol.description || 'No description provided.'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-1">Status</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedProtocol.ethicsApprovalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                  selectedProtocol.ethicsApprovalStatus === 'Rejected' ? 'bg-red-50 text-red-700' :
                  'bg-amber-50 text-amber-700'
                }`}>
                  {selectedProtocol.ethicsApprovalStatus}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-1">Sample Size</h4>
                <p className="text-foreground">{selectedProtocol.sampleSize}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Inclusion Criteria</h4>
              <div className="flex gap-2 flex-wrap">
                {selectedProtocol.inclusionCriteria?.length > 0 ? selectedProtocol.inclusionCriteria.map((t: string) => (
                  <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{t}</span>
                )) : <span className="text-sm text-secondary">None specified</span>}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
