import { create } from 'zustand';

interface Workspace {
  _id: string;
  title: string;
  diseaseCategory: string;
}

interface GraphNode {
  id: string;
  name: string;
  val: number;
  group: number;
}

interface GraphEdge {
  source: string;
  target: string;
  label: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  institution: string;
}

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace) => void;
  
  // Knowledge Graph Data
  graphData: { nodes: GraphNode[], links: GraphEdge[] };
  setGraphData: (data: { nodes: GraphNode[], links: GraphEdge[] }) => void;

  // New Modules State
  trials: any[];
  setTrials: (trials: any[]) => void;
  protocols: any[];
  setProtocols: (protocols: any[]) => void;
  registryItems: any[];
  setRegistryItems: (items: any[]) => void;

  // Agent State
  agentStep: 'planning' | 'retrieval' | 'analysis' | 'drafting' | 'completed' | 'error' | 'idle';
  setAgentStep: (step: AppState['agentStep']) => void;

  // UI State
  isUploadModalOpen: boolean;
  setUploadModalOpen: (isOpen: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    _id: '66923b2c1234567890abcdef',
    name: 'Global Administrator',
    email: 'admin@diaresearch.iq',
    institution: 'DiaResearch Global',
    token: 'mock-jwt-token'
  },
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  currentWorkspace: null,
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  
  graphData: { nodes: [], links: [] },
  setGraphData: (data) => set({ graphData: data }),

  trials: [],
  setTrials: (trials) => set({ trials }),
  protocols: [],
  setProtocols: (protocols) => set({ protocols }),
  registryItems: [],
  setRegistryItems: (items) => set({ registryItems: items }),

  agentStep: 'idle',
  setAgentStep: (step) => set({ agentStep: step }),

  // UI State
  isUploadModalOpen: false,
  setUploadModalOpen: (isOpen) => set({ isUploadModalOpen: isOpen })
}));
