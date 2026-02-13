import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapPin, CheckCircle, Heart, MessageCircle } from 'lucide-react';
import { IncidentType, Report } from '../types';

export const FeedPage: React.FC = () => {
  const { reports, likeReport } = useApp();

  return (
    <div className="p-4 pb-24">
      <div className="flex justify-between items-end mb-6 pt-2">
        <h1 className="text-2xl font-bold text-gray-800">Mural da Comunidade</h1>
        <span className="text-xs text-gray-500 font-medium bg-gray-200 px-2 py-1 rounded-full">{reports.length} Relatos</span>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <FeedCard key={report.id} report={report} onLike={() => likeReport(report.id)} />
        ))}
      </div>
    </div>
  );
};

const FeedCard: React.FC<{ report: Report; onLike: () => void }> = ({ report, onLike }) => {
  const getIconColor = (type: IncidentType) => {
    switch (type) {
      case IncidentType.THEFT: return 'bg-red-100 text-red-600';
      case IncidentType.SUSPICIOUS: return 'bg-amber-100 text-amber-600';
      case IncidentType.MEDICAL: return 'bg-blue-100 text-blue-600';
      case IncidentType.FIRE: return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
            {report.author[0]}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{report.author}</p>
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(report.timestamp, { addSuffix: true, locale: ptBR })}
            </p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${getIconColor(report.type)}`}>
          {report.type}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 leading-relaxed">{report.description}</p>

      {report.location && (
        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
          <MapPin size={14} />
          <span>{report.location.address || `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`}</span>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex space-x-4">
            <button 
                onClick={onLike}
                className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
            >
                <Heart size={18} fill={report.likes > 0 ? '#ef4444' : 'none'} className={report.likes > 0 ? 'text-red-500' : ''} />
                <span className="text-xs font-medium">{report.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-medium">Comentar</span>
            </button>
        </div>
        {report.verified && (
          <div className="flex items-center space-x-1 text-green-600">
            <CheckCircle size={16} />
            <span className="text-xs font-bold">Verificado</span>
          </div>
        )}
      </div>
    </div>
  );
};