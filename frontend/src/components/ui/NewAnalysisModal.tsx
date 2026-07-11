import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Microscope, X, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NewAnalysisModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    researchFocus: '',
    diseaseCategory: 'Diabetes Mellitus, Type 2',
    keywords: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert comma separated keywords to array
      const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
      
      const payload = {
        title: formData.title,
        researchFocus: formData.researchFocus,
        diseaseCategory: formData.diseaseCategory,
        keywords: keywordsArray,
        studyObjectives: formData.researchFocus, // Set studyObjectives equal to researchFocus to satisfy required constraint
        institution: 'Joslin Center' // Hardcoded for demo
      };

      await axios.post('/api/workspaces', payload, { withCredentials: true });
      
      // On success, navigate to dashboard and close
      onClose();
      router.push('/workspaces/dashboard');
      
    } catch (error) {
      console.error('Failed to create new analysis:', error);
      alert('Failed to start analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4 sm:p-0">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-bold font-heading text-primary flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center">
              <Microscope size={18} />
            </div>
            Start New Analysis
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          <form id="new-analysis-form" onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm font-label text-secondary mb-1">Analysis Title</label>
            <input 
              required
              type="text" 
              placeholder="e.g. SGLT2 Inhibitors Meta-analysis"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-label text-secondary mb-1">Research Focus</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe the main objectives or research question..."
              value={formData.researchFocus}
              onChange={e => setFormData({ ...formData, researchFocus: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-label text-secondary mb-1">Disease Category</label>
              <select 
                value={formData.diseaseCategory}
                onChange={e => setFormData({ ...formData, diseaseCategory: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
                <option>Diabetes Mellitus, Type 2</option>
                <option>Diabetes Mellitus, Type 1</option>
                <option>Gestational Diabetes</option>
                <option>PreDiabetes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-label text-secondary mb-1">Keywords (Comma Separated)</label>
              <input 
                type="text" 
                placeholder="SGLT2, renal outcomes, RCT"
                value={formData.keywords}
                onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </form>
        </div>
        
        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors focus:outline-none min-h-[44px]"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="new-analysis-form"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2 focus:outline-none min-h-[44px]"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? 'Creating...' : 'Launch Workspace'}
          </button>
        </div>
      </div>
    </div>
  );
}
