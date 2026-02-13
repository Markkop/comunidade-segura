import React from 'react';
import { useApp } from '../context/AppContext';
import { User, Bell, Shield, Moon, LogOut, ChevronRight } from 'lucide-react';

export const ConfigPage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 pt-2">Configurações</h1>

      {/* Profile Card */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 mb-8">
        <img src={user.avatarUrl} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white shadow-sm" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">Residente Verificado</p>
        </div>
      </div>

      <div className="space-y-6">
        <Section title="Geral">
          <SettingItem icon={User} label="Detalhes da Conta" />
          <SettingItem icon={Bell} label="Notificações" badge="3" />
          <SettingItem icon={Moon} label="Modo Escuro" toggle />
        </Section>

        <Section title="Segurança">
          <SettingItem icon={Shield} label="Privacidade e Dados" />
          <SettingItem icon={Shield} label="Configuração do Botão de Pânico" />
        </Section>

        <button className="w-full mt-8 p-4 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center space-x-2">
            <LogOut size={20} />
            <span>Sair</span>
        </button>
      </div>

      <div className="mt-12 text-center text-xs text-gray-400">
        <p>Comunidade Segura v0.1.0 (Protótipo)</p>
        <p>Florianópolis, SC</p>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{title}</h3>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
      {children}
    </div>
  </div>
);

const SettingItem: React.FC<{ icon: any; label: string; badge?: string; toggle?: boolean }> = ({ icon: Icon, label, badge, toggle }) => (
  <div className="flex items-center justify-between p-4 active:bg-gray-50 cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {badge && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
      {toggle ? (
        <div className="w-10 h-6 bg-gray-200 rounded-full relative">
            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
        </div>
      ) : (
        <ChevronRight size={16} className="text-gray-400" />
      )}
    </div>
  </div>
);