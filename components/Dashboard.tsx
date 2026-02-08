
import React from 'react';
import { Agent } from '../types';

interface DashboardProps {
  agents: Agent[];
  onEdit: (agent: Agent) => void;
  onTest: (agent: Agent) => void;
  onDelete: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ agents, onEdit, onTest, onDelete }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Agents</h1>
        <p className="text-gray-500">Manage and test your collection of AI personalities.</p>
      </header>

      {agents.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Start by creating your first custom agent to help you with tasks or learning.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div 
              key={agent.id} 
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:shadow-indigo-100/50 transition-all group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors">{agent.icon}</span>
                <div className="flex gap-1">
                  <button 
                    onClick={() => onEdit(agent)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => onDelete(agent.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">{agent.name}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-3">{agent.description}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  agent.model.includes('pro') ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {agent.model.includes('pro') ? 'Gemini Pro' : 'Gemini Flash'}
                </span>
              </div>

              <button 
                onClick={() => onTest(agent)}
                className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Test Conversation
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
