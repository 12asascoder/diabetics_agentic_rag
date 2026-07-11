"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileSearch, Microscope } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

export default function TrialsPage() {
  const { trials, setTrials } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrials = async () => {
      try {
        setLoading(true);
        // We use axios to fetch from our backend which calls Katzilla + DB
        const res = await axios.get('http://localhost:5000/api/trials', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTrials(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrials();
  }, [setTrials]);

  const columns = [
    { header: 'Trial ID', accessor: 'trialId' as const },
    { 
      header: 'Title', 
      accessor: 'title' as const,
      render: (val: string) => <div className="font-medium text-foreground max-w-md truncate">{val}</div>
    },
    { 
      header: 'Status', 
      accessor: 'status' as const,
      render: (val: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          val.toLowerCase().includes('active') || val.toLowerCase().includes('recruiting')
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {val}
        </span>
      )
    },
    { header: 'Sponsor', accessor: 'sponsor' as const },
    { header: 'Phase', accessor: 'phase' as const },
    { 
      header: 'Start Date', 
      accessor: 'startDate' as const,
      render: (val: string) => val ? format(new Date(val), 'MMM d, yyyy') : 'Unknown'
    },
    { 
      header: 'Source', 
      accessor: 'source' as const,
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs font-mono ${val === 'Katzilla' ? 'bg-[#f5b800]/10 text-[#f5b800] border border-[#f5b800]/20' : 'bg-blue-50 text-blue-700'}`}>
          {val || 'Database'}
        </span>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-8 w-full max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Clinical Trials</h1>
          <p className="text-secondary text-sm">Loading live data from Katzilla and local registry...</p>
        </div>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 w-full max-w-7xl mx-auto">
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100">
          Error loading trials: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 animate-fade-in font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <Microscope className="text-primary" size={24} />
            Clinical Trials Explorer
          </h1>
          <p className="text-secondary text-sm mt-1">Live data powered by Katzilla API and local registry.</p>
        </div>
      </div>

      {trials.length === 0 ? (
        <EmptyState 
          icon={FileSearch}
          title="No Trials Found"
          description="There are currently no clinical trials matching your criteria or synced from Katzilla."
        />
      ) : (
        <DataTable 
          data={trials}
          columns={columns}
          searchKeys={['title', 'trialId', 'sponsor', 'status']}
          onRowClick={(row) => console.log('View trial details:', row)}
        />
      )}
    </div>
  );
}
