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

interface AppState {
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
  currentWorkspace: null,
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  
  graphData: { nodes: [], links: [] },
  setGraphData: (data) => set({ graphData: data }),

  agentStep: 'idle',
  setAgentStep: (step) => set({ agentStep: step })
}));
