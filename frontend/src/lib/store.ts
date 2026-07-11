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
  
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace) => void;
  
  // Knowledge Graph Data
  graphData: { nodes: GraphNode[], links: GraphEdge[] };
  setGraphData: (data: { nodes: GraphNode[], links: GraphEdge[] }) => void;

  // Agent State
  agentStep: 'planning' | 'retrieval' | 'analysis' | 'drafting' | 'completed' | 'error' | 'idle';
  setAgentStep: (step: AppState['agentStep']) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  currentWorkspace: null,
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  
  graphData: { nodes: [], links: [] },
  setGraphData: (data) => set({ graphData: data }),

  agentStep: 'idle',
  setAgentStep: (step) => set({ agentStep: step })
}));
