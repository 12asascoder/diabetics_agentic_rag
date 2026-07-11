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
          <Link href="#" className="text-primary hover:underline">Log In</Link>
          <Link href="/workspaces" className="bg-primary text-white px-5 py-2.5 rounded hover:bg-primary/90 transition-colors">
            Request Demo
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
          <Link href="/workspaces" className="bg-primary text-white px-8 py-3.5 rounded font-medium hover:bg-primary/90 transition-colors shadow-sm">
            Start Researching
          </Link>
          <button className="bg-white text-primary border border-gray-200 px-8 py-3.5 rounded font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Explore Methodology
          </button>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border border-gray-200 p-2 mb-20">
          <div className="bg-gray-50 rounded-lg h-[400px] border border-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-label">Interactive Platform Mockup Placeholder</span>
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
