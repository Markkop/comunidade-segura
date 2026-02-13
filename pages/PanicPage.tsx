import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export const PanicPage: React.FC = () => {
  const [isActivating, setIsActivating] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'found'>('idle');
  const [locationAddress, setLocationAddress] = useState<string>('');

  const handlePanicClick = () => {
    if (isActive) {
      // Deactivate
      setIsActive(false);
      setIsActivating(false);
      return;
    }
    
    // Simulate activation delay
    setIsActivating(true);
    setTimeout(() => {
      setIsActive(true);
      setIsActivating(false);
      // Auto-trigger location
      fetchLocation();
    }, 1500);
  };

  const fetchLocation = () => {
    setLocationStatus('loading');
    setTimeout(() => {
      setLocationStatus('found');
      setLocationAddress('R. Eng. Agronômico Andrei Cristian Ferreira, Trindade');
    }, 2000);
  };

  return (
    <div className={`h-full flex flex-col p-6 transition-colors duration-500 ${isActive ? 'bg-brand-900' : 'bg-gray-50'}`}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className={`text-3xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-900'}`}>
            {isActive ? 'EMERGÊNCIA ATIVA' : 'Botão de Pânico'}
          </h1>
          <p className={`text-sm transition-colors ${isActive ? 'text-brand-100' : 'text-gray-600'}`}>
            {isActive 
              ? 'Alerta enviado para membros próximos e segurança.' 
              : 'Pressione para alertar a comunidade e segurança imediatamente.'}
          </p>
        </div>

        {/* The Button */}
        <div className="relative group">
           {isActivating && (
            <div className="absolute inset-0 rounded-full animate-ping-slow bg-brand-500 opacity-75"></div>
          )}
          <button
            onClick={handlePanicClick}
            className={`
              relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95
              ${isActive 
                ? 'bg-white text-brand-600 border-8 border-brand-500' 
                : 'bg-gradient-to-br from-brand-500 to-brand-700 text-white border-8 border-brand-100 shadow-brand-500/40'}
            `}
          >
            {isActivating ? (
              <Loader2 size={64} className="animate-spin mb-2" />
            ) : (
              <AlertTriangle size={80} className={`mb-2 ${isActive ? 'animate-pulse' : ''}`} />
            )}
            <span className="text-2xl font-black tracking-widest uppercase">
              {isActivating ? 'Segure...' : isActive ? 'PARAR' : 'SOS'}
            </span>
          </button>
        </div>

        {/* Location Status */}
        <div className={`
          w-full max-w-xs p-5 rounded-2xl border shadow-lg transition-all duration-300
          ${isActive 
            ? 'bg-white/10 border-white/20 text-white backdrop-blur-md' 
            : 'bg-white border-gray-100 text-gray-800'}
        `}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2.5">
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-100 text-brand-600'}`}>
                <MapPin size={18} />
              </div>
              <span className="font-bold text-sm tracking-wide">LOCALIZAÇÃO</span>
            </div>
            {locationStatus === 'idle' && (
              <button 
                onClick={fetchLocation}
                className={`
                  text-xs px-3 py-1.5 rounded-full font-semibold transition-colors
                  ${isActive 
                    ? 'bg-white/20 hover:bg-white/30 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                `}
              >
                Atualizar
              </button>
            )}
          </div>
          
          <div className="min-h-[24px] text-sm leading-relaxed">
            {locationStatus === 'idle' && <span className={`italic ${isActive ? 'text-white/70' : 'text-gray-400'}`}>Localização não compartilhada.</span>}
            {locationStatus === 'loading' && (
              <div className="flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin" />
                <span>Obtendo coordenadas GPS...</span>
              </div>
            )}
            {locationStatus === 'found' && (
              <div className="flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <CheckCircle2 size={18} className={`mt-0.5 ${isActive ? 'text-green-400' : 'text-green-600'}`} />
                <span className="font-medium">{locationAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};