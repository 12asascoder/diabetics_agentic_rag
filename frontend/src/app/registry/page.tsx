"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { DetailDrawer } from '@/components/ui/DetailDrawer';
import { Users, FileSpreadsheet, PlayCircle, Download, FileText, Tag } from 'lucide-react';
import axios from 'axios';

export default function RegistryPage() {
  const { registryItems, setRegistryItems } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    fetchRegistry();
  }, []);

  const fetchRegistry = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/registry', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRegistryItems(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    try {
      setSeeding(true);
      await axios.post('http://localhost:5000/api/registry/seed', { workspaceId: '000000000000000000000000' }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      await fetchRegistry();
    } catch (err: any) {
      alert(`Error seeding: ${err.response?.data?.message || err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' as const, render: (val: string) => <div className="font-medium text-foreground">{val}</div> },
    { header: 'Type', accessor: 'itemType' as const, render: (val: string) => <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">{val}</span> },
    { header: 'Description', accessor: 'description' as const, render: (val: string) => <div className="max-w-md truncate text-sm text-secondary">{val}</div> },
    { 
      header: 'Tags', 
      accessor: 'tags' as const, 
      render: (tags: string[]) => (
        <div className="flex gap-1 flex-wrap">
          {tags?.map(t => <span key={t} className="text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>)}
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="p-8 w-full max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading">Research Registry</h1>
        </div>
        <LoadingSkeleton type="table" count={5} />
      </div>
    );
  }

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 animate-fade-in font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <Users className="text-primary" size={24} />
            Research Registry
          </h1>
          <p className="text-secondary text-sm mt-1">Manage patients, studies, datasets, and institutional records.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleSeedData}
            disabled={seeding}
            className="flex items-center gap-2 bg-white border border-gray-200 text-secondary px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <PlayCircle size={16} />
            {seeding ? 'Importing CSV...' : 'Import from diabetes.csv'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-100 text-sm">
          {error}
        </div>
      )}

      {registryItems.length === 0 ? (
        <EmptyState 
          icon={FileSpreadsheet}
          title="Empty Registry"
          description="Your registry is currently empty. You can import records from the attached diabetes.csv file."
          primaryActionText={seeding ? "Importing..." : "Import CSV Data"}
          onPrimaryAction={handleSeedData}
        />
      ) : (
        <DataTable 
          data={registryItems}
          columns={columns}
          searchKeys={['name', 'description']}
          onRowClick={(row) => setSelectedItem(row)}
        />
      )}

      <DetailDrawer
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        title="Registry Record"
        subtitle={selectedItem?.itemType}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors">
              <Download size={16} /> Export JSON
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-white rounded border border-transparent hover:border-gray-200 transition-colors">
              <Tag size={16} /> Edit Tags
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-primary text-white hover:bg-primary/90 rounded transition-colors">
              <FileText size={16} /> View Full Record
            </button>
          </>
        }
      >
        {selectedItem && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Name</h4>
              <p className="text-foreground text-lg">{selectedItem.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Description</h4>
              <p className="text-foreground">{selectedItem.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Tags</h4>
              <div className="flex gap-2 flex-wrap">
                {selectedItem.tags?.map((t: string) => (
                  <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-secondary mb-2">Metadata Map</h4>
              <div className="bg-gray-50 border border-gray-100 rounded p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-gray-700">
                  {JSON.stringify(selectedItem.metadata, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
