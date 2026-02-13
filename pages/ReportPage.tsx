import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { IncidentType } from '../types';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Flame, HeartPulse, Eye, ShieldAlert, MoreHorizontal, MapPin, Loader2 } from 'lucide-react';

const QUICK_ACTIONS = [
  { type: IncidentType.THEFT, label: 'Roubo / Furto', icon: ShieldAlert, color: 'bg-red-100 text-red-600' },
  { type: IncidentType.SUSPICIOUS, label: 'Atitude Suspeita', icon: Eye, color: 'bg-amber-100 text-amber-600' },
  { type: IncidentType.HARASSMENT, label: 'Assédio', icon: AlertCircle, color: 'bg-purple-100 text-purple-600' },
  { type: IncidentType.VANDALISM, label: 'Vandalismo', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-600' },
  { type: IncidentType.MEDICAL, label: 'Emergência Médica', icon: HeartPulse, color: 'bg-blue-100 text-blue-600' },
  { type: IncidentType.FIRE, label: 'Incêndio / Perigo', icon: Flame, color: 'bg-orange-100 text-orange-600' },
];

export const ReportPage: React.FC = () => {
  const { addReport } = useApp();
  const navigate = useNavigate();
  
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [description, setDescription] = useState('');
  const [useLocation, setUseLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType && !description) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      addReport({
        type: selectedType || IncidentType.OTHER,
        description: description || `Reportado: ${selectedType}`,
        location: useLocation ? { lat: -27.6, lng: -48.5, address: 'Localização Atual' } : undefined,
      });
      setIsSubmitting(false);
      navigate('/feed');
    }, 1000);
  };

  return (
    <div className="p-6 pb-24 min-h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 pt-2">Reportar Incidente</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Quick Actions Grid */}
        <section>
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Seleção Rápida</label>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.type}
                type="button"
                onClick={() => setSelectedType(action.type)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  selectedType === action.type 
                    ? 'border-gray-800 bg-gray-50 ring-2 ring-gray-200' 
                    : 'border-transparent bg-white shadow-sm hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-full mb-2 ${action.color}`}>
                  <action.icon size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Details Input */}
        <section>
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Detalhes</label>
          <textarea
            className="w-full p-4 rounded-xl border-gray-200 shadow-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none resize-none bg-white"
            rows={4}
            placeholder="Descreva o que aconteceu ou adicione detalhes..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </section>

        {/* Location Toggle */}
        <div 
          onClick={() => setUseLocation(!useLocation)}
          className={`flex items-center justify-between p-4 rounded-xl border transition-colors cursor-pointer ${
            useLocation ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${useLocation ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              <MapPin size={20} />
            </div>
            <div>
              <p className={`font-medium ${useLocation ? 'text-green-800' : 'text-gray-600'}`}>Anexar Minha Localização</p>
              {useLocation && <p className="text-xs text-green-600">Precisão: Alta (~10m)</p>}
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            useLocation ? 'border-green-500 bg-green-500' : 'border-gray-300'
          }`}>
            {useLocation && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || (!selectedType && !description)}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
            isSubmitting || (!selectedType && !description)
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 active:scale-95'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span>Enviando Relatório...</span>
            </>
          ) : (
            <span>Enviar Relatório</span>
          )}
        </button>

      </form>
    </div>
  );
};