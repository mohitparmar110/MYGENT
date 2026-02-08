
export type ModelType = 'gemini-3-flash-preview' | 'gemini-3-pro-preview';

export interface Agent {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
  model: ModelType;
  icon: string;
  createdAt: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  EDITOR = 'EDITOR',
  TESTER = 'TESTER',
}
