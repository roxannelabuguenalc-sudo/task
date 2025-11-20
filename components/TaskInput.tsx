import React, { useState, FormEvent } from 'react';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Plus className="w-5 h-5 text-purple-500 transition-transform group-focus-within:rotate-90 duration-300" />
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full bg-[#111] border border-gray-800 text-gray-200 text-sm rounded-xl py-4 pl-12 pr-4 placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-lg shadow-black/50"
      />
      <button 
        type="submit"
        disabled={!text.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-600 text-white text-xs font-medium rounded-lg transition-all duration-200 opacity-0 group-focus-within:opacity-100 disabled:opacity-0"
      >
        Enter
      </button>
    </form>
  );
};