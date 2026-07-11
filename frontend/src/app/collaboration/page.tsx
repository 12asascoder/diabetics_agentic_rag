"use client";

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/DataTable';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Users, MessagesSquare, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

export default function CollaborationPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://127.0.0.1:5005/api/collaboration/tasks', {
          withCredentials: true
        });
        setTasks(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const columns = [
    { header: 'Task', accessor: 'title' as const, render: (val: string) => <div className="font-medium">{val}</div> },
    { 
      header: 'Status', 
      accessor: 'status' as const, 
      render: (val: string) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          val === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
          val === 'InProgress' ? 'bg-blue-50 text-blue-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {val}
        </span>
      )
    },
    { 
      header: 'Priority', 
      accessor: 'priority' as const,
      render: (val: string) => (
        <span className={`text-xs font-medium ${val === 'Critical' ? 'text-red-600' : val === 'High' ? 'text-amber-600' : 'text-gray-600'}`}>
          {val}
        </span>
      )
    },
    { header: 'Assigned To', accessor: 'assignedTo' as const, render: (val: any) => val?.name || 'Unassigned' },
    { header: 'Due Date', accessor: 'dueDate' as const, render: (val: string) => val ? format(new Date(val), 'MMM d, yyyy') : '-' }
  ];

  if (loading) return <div className="p-8 max-w-7xl mx-auto"><LoadingSkeleton type="table" count={5} /></div>;

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-6 animate-fade-in font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
            <Users className="text-primary" size={24} />
            Team Collaboration
          </h1>
          <p className="text-secondary text-sm mt-1">Manage team tasks, reviews, and workspace activity.</p>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
              <h2 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle size={18} className="text-secondary" />
                Active Tasks
              </h2>
            </div>
            {tasks.length === 0 ? (
              <EmptyState 
                icon={CheckCircle}
                title="No Tasks Found"
                description="Your team currently has no active tasks in this workspace."
              />
            ) : (
              <DataTable data={tasks} columns={columns} searchKeys={['title', 'status']} />
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
              <MessagesSquare size={18} className="text-secondary" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-secondary text-center py-8">No recent activity to display.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
