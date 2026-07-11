"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FlaskConical, 
  Plus, 
  LayoutDashboard, 
  Library, 
  Microscope, 
  BarChart2, 
  Users, 
  Settings, 
  HelpCircle,
  Search
} from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { label: 'Workspace', href: '/workspaces/dashboard', icon: LayoutDashboard },
    { label: 'Document Library', href: '/library', icon: Library },
    { label: 'Evidence Explorer', href: '/evidence', icon: Microscope },
    { label: 'Analytics', href: '/workspaces/dashboard', icon: BarChart2 },
    { label: 'Collaboration', href: '/workspaces/dashboard', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-white text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white flex flex-col h-full shrink-0">
        <div className="p-6 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-3 font-heading font-bold text-xl text-primary mb-1">
            <div className="bg-primary/5 p-1 rounded">
              <FlaskConical size={24} className="text-primary" />
            </div>
            <span>DiaResearch<br/>IQ</span>
          </div>
          <p className="text-xs font-label text-gray-500 pl-11">Joslin Center</p>
        </div>

        <div className="px-4 mb-6">
          <button className="w-full bg-primary text-white flex items-center justify-center gap-2 py-2.5 rounded font-medium text-sm hover:bg-primary/90 transition-colors">
            <Plus size={16} />
            New Analysis
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/workspaces') && item.label === 'Workspace');
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-blue-100/50 text-primary font-semibold' 
                    : 'text-secondary hover:bg-gray-50 hover:text-primary'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-primary' : 'text-gray-400'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <Link href="/workspaces/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
            <Settings size={18} className="text-gray-400" />
            Settings
          </Link>
          <Link href="/workspaces/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors">
            <HelpCircle size={18} className="text-gray-400" />
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-neutral">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-10">
          <h2 className="text-xl font-heading font-bold text-primary w-64 leading-tight">
            Diabetes Research<br/>Intelligence
          </h2>

          <div className="flex items-end h-full pt-6 pr-6">
            {['Dashboard', 'Trials', 'Protocols', 'Registry'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 pb-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex-1 max-w-sm relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search across registry..." 
              className="w-full bg-white border border-gray-200 rounded-md pl-4 pr-9 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <button className="text-gray-400 hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded font-medium text-sm hover:bg-primary/90 transition-colors">
              Export Data
            </button>
            <button className="bg-gray-50 border border-gray-200 text-secondary px-4 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">
              Institution Selector
            </button>
            <button className="text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-full p-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Apply the faint grid background to authenticated areas too (like in images 2 & 3) */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="relative z-10 h-full p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
