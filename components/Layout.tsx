import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AlertCircle, Map, MessageSquarePlus, Activity, Settings, ShieldAlert } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { to: '/', icon: ShieldAlert, label: 'Pânico', activeColor: 'text-brand-500' },
    { to: '/routes', icon: Map, label: 'Rotas', activeColor: 'text-blue-500' },
    { to: '/report', icon: MessageSquarePlus, label: 'Reportar', activeColor: 'text-orange-500' },
    { to: '/feed', icon: Activity, label: 'Mural', activeColor: 'text-purple-500' },
    { to: '/config', icon: Settings, label: 'Ajustes', activeColor: 'text-gray-700' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? item.activeColor : 'text-gray-400'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative">
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};