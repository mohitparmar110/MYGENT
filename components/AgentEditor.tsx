
import React, { useState, useEffect } from 'react';
import { Agent, ModelType } from '../types';
import { suggestAgentDetails } from '../services/geminiService';

interface AgentEditorProps {
  agent: Agent | null;
  onSave: (agent: Agent) => void;
  onCancel: () => void;
}

const AgentEditor: React.FC<AgentEditorProps> = ({ agent, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: '',
    description: '',
    systemInstruction: '',
    model: 'gemini-3-flash-preview',
    icon: '🤖',
    ...agent
  });
  const [isSuggesting, setIsSuggesting] = useState(false);

  const icons = ['🤖', '💻', '🎨', '📚', '🌍', '🛠️', '🧬', '⚡', '🧠', '💼', '🏡', '🎵'];

  const handleAutoSuggest = async () => {
    if (!formData.description) return;
    setIsSuggesting(true);
    const suggestions = await suggestAgentDetails(formData.description);
    setFormData(prev => ({ ...prev, ...suggestions }));
    setIsSuggesting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.systemInstruction) return;

    const finalAgent: Agent = {
      id: agent?.id || Math.random().toString(36).substr(2, 9),
      name: formData.name!,
      description: formData.description || '',
      systemInstruction: formData.systemInstruction!,
      model: (formData.model as ModelType) || 'gemini-3-flash-preview',
      icon: formData.icon || '🤖',
      createdAt: agent?.createdAt || Date.now()
    };

    onSave(finalAgent);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {agent ? 'Edit Agent' : 'Build New Agent'}
          </h1>
          <p className="text-gray-500">Define your agent's personality and rules.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Save Changes
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">1</span>
              Identity
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Agent Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Code Review Assistant"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                <div className="relative">
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe what this agent does..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none pr-32"
                  />
                  <button 
                    onClick={handleAutoSuggest}
                    disabled={isSuggesting || !formData.description}
                    className="absolute bottom-3 right-3 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-100 transition-all disabled:opacity-50 flex items-center gap-1"
                  >
                    {isSuggesting ? (
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    Gemini AI Help
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">2</span>
              Brains (System Instructions)
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-500 bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
                This is the most important part. Tell the agent exactly how to behave, what tone to use, and any specific constraints it should follow.
              </p>
              <textarea 
                value={formData.systemInstruction}
                onChange={e => setFormData({ ...formData, systemInstruction: e.target.value })}
                placeholder="You are a helpful assistant that... Always format code in blocks... Never mention competitors..."
                rows={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-mono text-sm"
              />
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              Visuals
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`text-2xl p-3 rounded-xl transition-all ${
                    formData.icon === icon ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              Model Configuration
            </h2>
            <div className="space-y-4">
              <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.model === 'gemini-3-flash-preview' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 hover:border-gray-200'
              }`}>
                <input 
                  type="radio" 
                  name="model" 
                  className="mt-1 accent-indigo-600"
                  checked={formData.model === 'gemini-3-flash-preview'}
                  onChange={() => setFormData({ ...formData, model: 'gemini-3-flash-preview' })}
                />
                <div>
                  <p className="font-bold text-gray-900">Gemini Flash</p>
                  <p className="text-xs text-gray-500">Super fast & efficient. Great for simple tasks and quick responses.</p>
                </div>
              </label>

              <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.model === 'gemini-3-pro-preview' ? 'border-purple-600 bg-purple-50/30' : 'border-gray-100 hover:border-gray-200'
              }`}>
                <input 
                  type="radio" 
                  name="model" 
                  className="mt-1 accent-purple-600"
                  checked={formData.model === 'gemini-3-pro-preview'}
                  onChange={() => setFormData({ ...formData, model: 'gemini-3-pro-preview' })}
                />
                <div>
                  <p className="font-bold text-gray-900">Gemini Pro</p>
                  <p className="text-xs text-gray-500">Advanced reasoning & complex coding. Best for deep logic and creative writing.</p>
                </div>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AgentEditor;
