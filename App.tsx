import React, { useState, useEffect, useCallback } from 'react';
import { Plus, CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react';
import { Task, FilterType } from './types';
import { TaskItem } from './components/TaskItem';
import { TaskInput } from './components/TaskInput';

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('nebula-tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load tasks", e);
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nebula-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(task => !task.completed));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex items-start justify-center pt-12 px-4 sm:px-6">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Header */}
        <header className="flex flex-col gap-1 mb-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </header>

        {/* Input Section */}
        <TaskInput onAdd={addTask} />

        {/* Filters */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-b border-gray-800 pb-2">
          <span>{activeCount} items left</span>
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`capitalize px-2 py-1 rounded transition-colors ${
                  filter === f 
                    ? 'text-purple-400 bg-purple-900/20 font-medium' 
                    : 'hover:text-gray-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-3 pb-10">
          {filteredTasks.length === 0 && tasks.length > 0 ? (
            <div className="text-center py-10 text-gray-600">
              <p>No {filter} tasks found.</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-600 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-900/50 flex items-center justify-center border border-gray-800">
                <CheckCircle2 className="w-6 h-6 text-gray-700" />
              </div>
              <p>You're all caught up!</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            ))
          )}
        </div>

        {/* Footer Actions */}
        {tasks.some(t => t.completed) && (
          <div className="flex justify-center">
            <button 
              onClick={clearCompleted}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Clear completed
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;