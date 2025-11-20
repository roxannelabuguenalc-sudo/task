import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div 
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
        task.completed 
          ? 'bg-[#0a0a0a]/50 border-gray-900 opacity-60' 
          : 'bg-[#111] border-gray-800 hover:border-purple-900/50 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.1)]'
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
            task.completed
              ? 'bg-purple-600 border-purple-600'
              : 'border-gray-600 hover:border-purple-400'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <Check 
            className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
              task.completed ? 'scale-100' : 'scale-0'
            }`} 
            strokeWidth={3}
          />
        </button>
        <span 
          className={`text-sm truncate transition-all duration-300 select-none ${
            task.completed ? 'text-gray-500 line-through' : 'text-gray-200'
          }`}
        >
          {task.text}
        </span>
      </div>
      
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 text-gray-600 hover:text-red-400 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};