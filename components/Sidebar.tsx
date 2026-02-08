
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  onCreateNew: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onCreateNew }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="font-bold text-xl tracking-tight text-gray-800">AgentStudio</h1>
        </div>

        <button 
          onClick={onCreateNew}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 mb-8 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Build Agent
        </button>

        <nav className="space-y-1">
          <button 
            onClick={() => onNavigate(ViewState.DASHBOARD)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeView === ViewState.DASHBOARD 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            My Agents
          </button>
          
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics (Soon)
          </button>
        </nav>
      </div>
      
      <div className="mt-auto p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <img src="https://picsum.photos/40/40" className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate text-gray-800">Pro Developer</p>
            <p className="text-xs text-gray-500 truncate">Free Tier</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
