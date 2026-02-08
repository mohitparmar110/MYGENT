
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgentEditor from './components/AgentEditor';
import ChatTester from './components/ChatTester';
import { Agent, ViewState } from './types';

const App: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [activeView, setActiveView] = useState<ViewState>(ViewState.DASHBOARD);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Initialize with some templates if empty
  useEffect(() => {
    const savedAgents = localStorage.getItem('gemini_agents');
    if (savedAgents) {
      setAgents(JSON.parse(savedAgents));
    } else {
      const templates: Agent[] = [
        {
          id: '1',
          name: 'Code Mentor',
          description: 'A friendly programming assistant focused on best practices.',
          systemInstruction: 'You are an expert software engineer mentor. Your goal is to help students learn coding by explaining concepts clearly, providing examples, and encouraging clean code. Always explain the "why" behind your suggestions.',
          model: 'gemini-3-pro-preview',
          icon: '💻',
          createdAt: Date.now()
        },
        {
          id: '2',
          name: 'Travel Guide',
          description: 'Personalized travel planning and local secrets.',
          systemInstruction: 'You are a world-class travel guide. You know hidden gems, local customs, and the best times to visit any location. Provide detailed itineraries and practical tips for travelers.',
          model: 'gemini-3-flash-preview',
          icon: '🌍',
          createdAt: Date.now()
        }
      ];
      setAgents(templates);
      localStorage.setItem('gemini_agents', JSON.stringify(templates));
    }
  }, []);

  const saveAgents = (newAgents: Agent[]) => {
    setAgents(newAgents);
    localStorage.setItem('gemini_agents', JSON.stringify(newAgents));
  };

  const handleCreateNew = () => {
    setSelectedAgent(null);
    setActiveView(ViewState.EDITOR);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveView(ViewState.EDITOR);
  };

  const handleTestAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setActiveView(ViewState.TESTER);
  };

  const handleDeleteAgent = (id: string) => {
    if (confirm('Are you sure you want to delete this agent?')) {
      const updated = agents.filter(a => a.id !== id);
      saveAgents(updated);
    }
  };

  const handleSaveAgent = (agent: Agent) => {
    const exists = agents.find(a => a.id === agent.id);
    let updated;
    if (exists) {
      updated = agents.map(a => a.id === agent.id ? agent : a);
    } else {
      updated = [agent, ...agents];
    }
    saveAgents(updated);
    setActiveView(ViewState.DASHBOARD);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        onNavigate={(view) => setActiveView(view)} 
        onCreateNew={handleCreateNew}
      />
      
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
        {activeView === ViewState.DASHBOARD && (
          <Dashboard 
            agents={agents} 
            onEdit={handleEditAgent} 
            onTest={handleTestAgent}
            onDelete={handleDeleteAgent}
          />
        )}
        
        {activeView === ViewState.EDITOR && (
          <AgentEditor 
            agent={selectedAgent} 
            onSave={handleSaveAgent} 
            onCancel={() => setActiveView(ViewState.DASHBOARD)} 
          />
        )}

        {activeView === ViewState.TESTER && selectedAgent && (
          <ChatTester 
            agent={selectedAgent} 
            onBack={() => setActiveView(ViewState.DASHBOARD)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
