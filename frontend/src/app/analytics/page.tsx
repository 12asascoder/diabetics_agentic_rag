"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, FileText, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

const COLORS = ['#10b981', '#f5b800', '#3b82f6', '#8b5cf6'];

export default function AnalyticsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        // We'll use registry data to derive analytics
        const res = await axios.get('http://localhost:5000/api/registry', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div className="p-8 max-w-7xl mx-auto"><LoadingSkeleton type="card" count={4} /></div>;
  }

  // Derive simple aggregations from registry data
  const patients = data.filter(d => d.itemType === 'Patient');
  const positiveCases = patients.filter(p => p.metadata?.Outcome === '1').length;
  const totalPatients = patients.length || 1; // avoid div by 0

  const ageDistribution = patients.reduce((acc, p) => {
    const age = parseInt(p.metadata?.Age || '0');
    let group = '0-20';
    if (age > 20 && age <= 40) group = '21-40';
    else if (age > 40 && age <= 60) group = '41-60';
    else if (age > 60) group = '60+';
    
    const existing = acc.find((a: any) => a.name === group);
    if (existing) existing.count++;
    else acc.push({ name: group, count: 1 });
    return acc;
  }, []).sort((a: any, b: any) => a.name.localeCompare(b.name));

  const typeDistribution = data.reduce((acc, item) => {
    const existing = acc.find((a: any) => a.name === item.itemType);
    if (existing) existing.value++;
    else acc.push({ name: item.itemType, value: 1 });
    return acc;
  }, []);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground flex items-center gap-2">
          <Activity className="text-primary" size={24} />
          Workspace Analytics
        </h1>
        <p className="text-secondary text-sm mt-1">Live overview of your research data, registry items, and trial statistics.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium uppercase tracking-wider">Total Records</p>
            <h3 className="text-2xl font-bold font-heading">{data.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium uppercase tracking-wider">Patients</p>
            <h3 className="text-2xl font-bold font-heading">{patients.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium uppercase tracking-wider">Positive Cases</p>
            <h3 className="text-2xl font-bold font-heading">{positiveCases}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm text-secondary font-medium uppercase tracking-wider">Prevalence</p>
            <h3 className="text-2xl font-bold font-heading">{((positiveCases / totalPatients) * 100).toFixed(1)}%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
          <h3 className="text-lg font-bold font-heading mb-6">Patient Age Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageDistribution}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f9fafb' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96">
          <h3 className="text-lg font-bold font-heading mb-6">Registry Composition</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeDistribution.length > 0 ? typeDistribution : [{ name: 'Empty', value: 1 }]}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {(typeDistribution.length > 0 ? typeDistribution : [{ name: 'Empty', value: 1 }]).map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
