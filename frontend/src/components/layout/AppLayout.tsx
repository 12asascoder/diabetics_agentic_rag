"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Search,
  LineChart,
  FileText,
  MessagesSquare,
  LogOut,
  UserCircle,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '@/lib/store';
import axios from 'axios';
import { NewAnalysisModal } from '@/components/ui/NewAnalysisModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewAnalysisOpen, setIsNewAnalysisOpen] = useState(false);
  const { user, clearUser } = useStore();

  const navItems = [
    { label: 'Workspace', href: '/workspaces/dashboard', icon: LayoutDashboard },
    { label: 'Document Library', href: '/library', icon: Library },
    { label: 'Evidence Explorer', href: '/evidence', icon: Microscope },
    { label: 'Research Registry', href: '/registry', icon: Users },
    { label: 'Clinical Trials', href: '/trials', icon: FlaskConical },
    { label: 'Protocols', href: '/protocols', icon: FileText },
    { label: 'Analytics', href: '/analytics', icon: LineChart },
    { label: 'Collaboration', href: '/collaboration', icon: MessagesSquare },
  ];

  return (
    <div className="flex h-screen bg-white text-foreground font-sans overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full shrink-0 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 lg:p-6 border-b border-gray-100 mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 font-heading font-bold text-xl text-primary mb-1">
              <div className="bg-primary/5 p-1 rounded">
                <FlaskConical size={24} className="text-primary" />
              </div>
              <span>DiaResearch<br className="hidden lg:block"/>IQ</span>
            </div>
            <p className="text-xs font-label text-gray-500 lg:pl-11">Joslin Center</p>
          </div>
          <button 
            className="lg:hidden text-gray-500 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-4 mb-6">
          <button 
            onClick={() => setIsNewAnalysisOpen(true)}
            className="w-full bg-primary text-white flex items-center justify-center gap-2 py-2.5 rounded font-medium text-sm hover:bg-primary/90 transition-colors focus:outline-none min-h-[44px]"
          >
            <Plus size={16} />
            New Analysis
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith('/workspaces') && item.label === 'Workspace');
            return (
              <Link 
                key={item.label} 
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors min-h-[44px] ${
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
          <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors min-h-[44px]">
            <Settings size={18} className="text-gray-400" />
            Settings
          </Link>
          <Link href="/workspaces/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:text-primary hover:bg-gray-50 rounded-md transition-colors min-h-[44px]">
            <HelpCircle size={18} className="text-gray-400" />
            Support
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-neutral w-full">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between shrink-0 z-30 relative px-4 py-3 lg:px-8 lg:py-0 lg:h-20 gap-4 lg:gap-0">
          
          {/* Mobile Top Row */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden text-gray-500 hover:text-primary p-2 -ml-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg lg:text-xl font-heading font-bold text-primary lg:w-64 leading-tight">
                Diabetes Research<br className="hidden lg:block"/>Intelligence
              </h2>
            </div>

            {/* Mobile Profile Toggle */}
            <div className="relative lg:hidden">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none"
              >
                {user?.name ? <span className="font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span> : <UserCircle size={24} />}
              </button>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-primary truncate">{user?.name || 'Guest User'}</p>
                      <p className="text-xs text-secondary truncate mb-1">{user?.email || 'Not logged in'}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation Tabs (Scrollable on Mobile) */}
          <div className="flex items-end h-full w-full lg:w-auto overflow-x-auto hide-scrollbar pt-2 lg:pt-6 lg:pr-6 border-b lg:border-none border-gray-100">
            {['Dashboard', 'Trials', 'Protocols', 'Registry'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 pb-3 lg:pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap min-h-[44px] ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-secondary hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Action Row */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex-1 lg:max-w-xs relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white border border-gray-200 rounded-md pl-4 pr-9 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 min-h-[44px]"
              />
            </div>

            <div className="hidden lg:flex items-center gap-4 ml-6">
              <button className="bg-primary text-white px-4 py-2 rounded font-medium text-sm hover:bg-primary/90 transition-colors min-h-[40px]">
                Export Data
              </button>
              
              {/* Desktop Profile Toggle */}
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none"
                >
                  {user?.name ? <span className="font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span> : <UserCircle size={24} />}
                </button>
                
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-primary truncate">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-secondary truncate mb-1">{user?.email || 'Not logged in'}</p>
                        <p className="text-[10px] font-label text-tertiary uppercase tracking-wider">{user?.institution || ''}</p>
                      </div>
                      <Link href="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:bg-gray-50">
                        <Settings size={16} /> Account Settings
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto relative w-full">
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="relative z-10 h-full p-4 md:p-6 lg:p-8 overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>

      <NewAnalysisModal 
        isOpen={isNewAnalysisOpen} 
        onClose={() => setIsNewAnalysisOpen(false)} 
      />
    </div>
  );
}
