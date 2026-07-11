"use client";

import React, { useState } from 'react';
import { useStore } from '@/lib/store';
import { User, Shield, Key, Bell, Save } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('Profile');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'Profile', icon: User, label: 'Profile Details' },
    { id: 'Security', icon: Shield, label: 'Password & Security' },
    { id: 'API', icon: Key, label: 'API Keys' },
    { id: 'Notifications', icon: Bell, label: 'Notifications' }
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-8">
      {/* Settings Sidebar */}
      <div className="w-64 shrink-0">
        <h1 className="text-2xl font-heading font-bold text-primary mb-6">Settings</h1>
        <nav className="flex flex-col gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:bg-gray-100'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
        {activeTab === 'Profile' && (
          <div className="p-8">
            <h2 className="text-xl font-heading font-bold text-primary mb-6">Profile Details</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-label text-secondary mb-2">Full Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-label text-secondary mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email || ''} className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-label text-secondary mb-2">Institution / Organization</label>
                <input type="text" defaultValue={user?.institution || ''} className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-label text-secondary mb-2">Role</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary">
                  <option>Principal Investigator</option>
                  <option>Clinical Researcher</option>
                  <option>Data Analyst</option>
                  <option>Administrator</option>
                </select>
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  {isSaving ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <Save size={16} />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="p-8">
            <h2 className="text-xl font-heading font-bold text-primary mb-6">Password & Security</h2>
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-label text-secondary mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-label text-secondary mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-label text-secondary mb-2">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button onClick={handleSave} className="bg-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  {isSaving ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" /> : <Save size={16} />}
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'API' && (
          <div className="p-8">
            <h2 className="text-xl font-heading font-bold text-primary mb-2">Katzilla API Integration</h2>
            <p className="text-sm text-secondary mb-8">Manage your API keys to connect with external LLMs, Vector Databases, and third-party tools via Katzilla.</p>
            <div className="space-y-6 max-w-2xl">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-4">
                <div className="mt-1 text-blue-600"><Key size={20} /></div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Active Secret Key</h4>
                  <p className="text-xs text-secondary mt-1">This key grants access to all configured LLMs and Vector Search instances in your Katzilla project.</p>
                  <div className="mt-4 flex gap-2">
                    <input type="password" value="sk_katzilla_***********************" readOnly className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm font-mono text-gray-500" />
                    <button className="px-4 py-1.5 bg-white border border-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors shadow-sm">Copy</button>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                <button className="text-red-600 font-medium text-sm hover:underline">Revoke Key and Generate New...</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Notifications' && (
          <div className="p-8">
            <h2 className="text-xl font-heading font-bold text-primary mb-6">Notification Preferences</h2>
            <div className="space-y-4 max-w-2xl">
              {[
                { title: 'Protocol Approvals', desc: 'Notify me when a protocol receives IRB approval' },
                { title: 'Trial Matching Alerts', desc: 'Weekly digest of new patients matching my active clinical trials' },
                { title: 'Team Collaboration', desc: 'Email me when I am mentioned in a workspace comment' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                    <p className="text-xs text-secondary mt-1">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
