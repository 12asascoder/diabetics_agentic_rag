import Link from 'next/link';
import { FlaskConical, ChevronRight, Activity, FileCheck, Database, LineChart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral flex flex-col font-sans relative">
      {/* Faint Background Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <header className="px-8 py-5 flex justify-between items-center z-10 bg-neutral/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center gap-2 font-heading font-bold text-lg text-primary">
          <FlaskConical size={20} className="text-primary" />
          <span>DiaResearch IQ</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-secondary">
          <Link href="#" className="hover:text-primary transition-colors">Platform</Link>
          <Link href="#" className="hover:text-primary transition-colors">Solutions</Link>
          <Link href="#" className="hover:text-primary transition-colors">Resources</Link>
          <Link href="#" className="hover:text-primary transition-colors">Company</Link>
        </nav>
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="/login" className="text-primary hover:underline">Log In</Link>
          <Link href="/login" className="bg-primary text-white px-5 py-2.5 rounded hover:bg-primary/90 transition-colors">
            Demo
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-16 pb-24 px-4 z-10 w-full max-w-7xl mx-auto">
        <div className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-label mb-8 flex items-center gap-2 border border-tertiary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          New available: Advanced Trial Matching Analytics v2.0
        </div>

        <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary max-w-3xl text-center leading-[1.1] tracking-tight mb-6">
          Empowering Diabetes Research with Clinical Intelligence.
        </h1>
        
        <p className="text-lg text-secondary max-w-2xl text-center mb-10 leading-relaxed">
          Accelerate breakthrough discoveries with our unified platform for clinical data analysis, protocol management, and global registry integration.
        </p>

        <div className="flex gap-4 mb-20">
          <Link href="/login" className="bg-primary text-white px-8 py-3.5 rounded font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Start Researching
          </Link>
          <button className="bg-white text-primary border border-gray-200 px-8 py-3.5 rounded font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Explore Methodology
          </button>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="w-full max-w-5xl relative mb-20 group">
          {/* Decorative glows behind the mockup */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-primary rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden flex flex-col h-[500px]">
            {/* Window Controls */}
            <div className="h-10 border-b border-gray-100 bg-gray-50/50 flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-sm"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
              <div className="mx-auto text-xs font-medium text-gray-400 flex items-center gap-1"><FlaskConical size={12}/> DiaResearch IQ Dashboard</div>
            </div>
            
            {/* Mockup Body */}
            <div className="flex-1 flex bg-neutral/30">
              {/* Sidebar */}
              <div className="w-48 border-r border-gray-100 bg-white/50 p-4 space-y-4">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center"><FlaskConical size={12} className="text-primary"/></div>
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-8 w-full bg-primary/10 rounded flex items-center px-3 gap-2"><div className="w-4 h-4 bg-primary/40 rounded-sm"></div><div className="h-3 w-16 bg-primary/40 rounded"></div></div>
                <div className="h-8 w-full bg-transparent hover:bg-gray-100 transition-colors rounded flex items-center px-3 gap-2"><div className="w-4 h-4 bg-gray-300 rounded-sm"></div><div className="h-3 w-20 bg-gray-200 rounded"></div></div>
                <div className="h-8 w-full bg-transparent hover:bg-gray-100 transition-colors rounded flex items-center px-3 gap-2"><div className="w-4 h-4 bg-gray-300 rounded-sm"></div><div className="h-3 w-12 bg-gray-200 rounded"></div></div>
                <div className="h-8 w-full bg-transparent hover:bg-gray-100 transition-colors rounded flex items-center px-3 gap-2"><div className="w-4 h-4 bg-gray-300 rounded-sm"></div><div className="h-3 w-24 bg-gray-200 rounded"></div></div>
              </div>
              
              {/* Main content */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center shrink-0">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-gray-800 rounded"></div>
                    <div className="h-3 w-32 bg-gray-400 rounded"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-9 w-24 bg-white border border-gray-200 shadow-sm rounded"></div>
                    <div className="h-9 w-32 bg-primary text-primary-foreground shadow-sm rounded opacity-90"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 shrink-0">
                  {[
                    { label: 'Active Trials', val: '24', trend: 'bg-green-100 w-12' },
                    { label: 'Registry Patients', val: '14,291', trend: 'bg-green-100 w-16' },
                    { label: 'Protocols Pending', val: '3', trend: 'bg-amber-100 w-10' }
                  ].map((card, i) => (
                    <div key={i} className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm flex flex-col gap-3 relative overflow-hidden group/card hover:border-primary/30 transition-colors">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full -z-10 group-hover/card:from-blue-100 transition-colors"></div>
                      <div className="h-3 w-24 bg-gray-400 rounded"></div>
                      <div className="h-8 w-20 bg-gray-800 rounded"></div>
                      <div className={`h-2 ${card.trend} rounded mt-2`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm flex-1 p-5 flex flex-col relative overflow-hidden">
                  <div className="h-4 w-40 bg-gray-800 rounded mb-8 shrink-0"></div>
                  
                  {/* Faint grid lines for chart */}
                  <div className="absolute inset-x-5 top-20 bottom-5 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-t border-gray-300 w-full"></div>
                    <div className="border-t border-gray-300 w-full"></div>
                    <div className="border-t border-gray-300 w-full"></div>
                    <div className="border-t border-gray-300 w-full"></div>
                  </div>

                  {/* Chart bars */}
                  <div className="flex items-end justify-between gap-2 flex-1 px-4 relative z-10">
                    {[40, 70, 45, 90, 65, 100, 80, 55, 85, 30, 60, 75].map((h, i) => (
                      <div key={i} className="w-10 group/bar flex flex-col items-center justify-end h-full">
                        <div 
                          className="w-full bg-gradient-to-t from-primary/80 to-primary/40 rounded-t-sm group-hover/bar:from-primary group-hover/bar:to-primary transition-colors cursor-pointer shadow-sm relative overflow-hidden" 
                          style={{ height: `${h}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/bar:translate-y-0 transition-transform duration-300"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center w-full">
          <p className="text-xs font-label tracking-widest text-gray-400 uppercase mb-8">Trusted by leading research institutions</p>
          <div className="flex flex-wrap justify-center gap-12 text-secondary font-heading font-semibold text-lg opacity-80">
            <span>Joslin Diabetes Center</span>
            <span>Mayo Clinic</span>
            <span>Johns Hopkins Medicine</span>
            <span>Stanford Healthcare</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4">Architected for Precision</h2>
            <p className="text-secondary max-w-2xl mx-auto">
              Our platform unifies disparate data streams into a cohesive, actionable interface, designed specifically for the rigorous demands of modern endocrinology research.
            </p>
          </div>

          {/* Grid Layout matching Stitch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="md:col-span-2 bg-[#F1F5F9] rounded-xl p-8 border border-gray-200 relative overflow-hidden flex">
              <div className="z-10 flex-1 pr-8">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center mb-6">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-3">Dynamic Knowledge Graphs</h3>
                <p className="text-secondary text-sm leading-relaxed max-w-md">
                  Visualize complex relationships between genomic markers, phenotypic traits, and treatment outcomes in real-time. Uncover hidden correlations that standard tabular data obscures.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center absolute right-8 top-1/2 -translate-y-1/2 opacity-30 text-secondary">
                 <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center mb-6">
                <FileCheck size={20} />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">Protocol Adherence</h3>
              <p className="text-secondary text-sm leading-relaxed mb-6 flex-1">
                Automated tracking of clinical trial milestones and regulatory compliance.
              </p>
              <Link href="#" className="text-xs font-label text-primary flex items-center gap-1 font-bold">
                LEARN MORE <ChevronRight size={14} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 flex flex-col">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded flex items-center justify-center mb-6">
                <Database size={20} />
              </div>
              <h3 className="text-xl font-heading font-bold text-primary mb-3">Registry Integration</h3>
              <p className="text-secondary text-sm leading-relaxed mb-6 flex-1">
                Seamlessly connect with global diabetes registries via secure FHIR APIs.
              </p>
              <Link href="#" className="text-xs font-label text-primary flex items-center gap-1 font-bold">
                VIEW SPECS <ChevronRight size={14} />
              </Link>
            </div>

            {/* Card 4 (Dark) */}
            <div className="md:col-span-2 bg-primary text-white rounded-xl p-8 overflow-hidden relative flex">
              <div className="z-10 flex-1 relative z-20">
                <div className="w-10 h-10 bg-white/10 text-white rounded flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                  <LineChart size={20} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Predictive Cohort Modeling</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                  Leverage machine learning algorithms to forecast disease progression and therapeutic response across stratified patient populations before initiating costly trials.
                </p>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-blue-500/20 to-transparent pointer-events-none z-10" />
            </div>

          </div>
        </div>
      </main>

      <footer className="px-8 py-8 border-t border-gray-200 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 font-heading font-bold text-primary">
          <FlaskConical size={18} />
          <span>DiaResearch IQ</span>
        </div>
        <p className="text-gray-500">© 2024 DiaResearch Intelligence. All rights reserved for clinical use.</p>
      </footer>
    </div>
  );
}
