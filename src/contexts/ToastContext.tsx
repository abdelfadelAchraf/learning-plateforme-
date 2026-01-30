import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { FiX } from "react-icons/fi";
interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed bottom-5 right-5 z-50 space-y-3">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-4 rounded-lg shadow-lg text-white flex items-center justify-between animate-slide-in min-w-75
              ${toast.type === 'success' ? 'bg-green-500' : 
                toast.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 hover:bg-white/20 rounded-full p-1"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};