import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ThumbsUp, Flag, Plus, Layers, Navigation, X } from 'lucide-react';

type LocationTab = 'UFSC' | 'Centro';

const LOCATION_COORDS = {
  'UFSC': { lat: -27.601, lng: -48.518, zoom: 16 },
  'Centro': { lat: -27.595, lng: -48.548, zoom: 15 }
};

export const EscapeRoutesPage: React.FC = () => {
  const { routes, toggleRouteVote, flagRoute, addRoute } = useApp();
  const [activeTab, setActiveTab] = useState<LocationTab>('UFSC');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form state
  const [newRouteTitle, setNewRouteTitle] = useState('');

  // Filter routes by active tab
  const activeRoutes = routes.filter(r => r.location === activeTab);
  
  // Sort by upvotes to find the "best" route default
  const sortedRoutes = [...activeRoutes].sort((a, b) => b.upvotes - a.upvotes);
  
  const selectedRoute = activeRoutes.find(r => r.id === selectedRouteId) || sortedRoutes[0];

  useEffect(() => {
    // Reset selection when tab changes to the best route
    if (sortedRoutes.length > 0) {
      setSelectedRouteId(sortedRoutes[0].id);
    } else {
      setSelectedRouteId(null);
    }
  }, [activeTab]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRoute({
      title: newRouteTitle || 'Nova Rota',
      description: 'Rota criada pelo usuário.',
      imageUrl: 'https://images.unsplash.com/photo-1554755229-ca4470e07232?q=80&w=600&auto=format&fit=crop',
      location: activeTab,
    });
    setShowAddModal(false);
    setNewRouteTitle('');
  };

  const coords = LOCATION_COORDS[activeTab];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Tabs */}
      <div className="flex border-b border-gray-200">
        {(['UFSC', 'Centro'] as LocationTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors relative ${
              activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full mx-8"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Map View (Squared) */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden shadow-inner group">
        
        {/* OpenStreetMap Iframe */}
        <iframe 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0} 
          marginWidth={0} 
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.005}%2C${coords.lat - 0.005}%2C${coords.lng + 0.005}%2C${coords.lat + 0.005}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`}
          className="absolute inset-0 z-0 opacity-80 contrast-125 grayscale-[30%]"
        ></iframe>

        {/* Map Controls (Floating) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2">
           <button className="p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-blue-600 active:scale-95 transition-transform">
             <Navigation size={20} className="fill-current" />
           </button>
           <button className="p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-blue-600 active:scale-95 transition-transform">
             <Layers size={20} />
           </button>
        </div>

        {/* Add Button (Floating on Map) */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="absolute bottom-4 right-4 z-20 p-4 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-600/40 hover:bg-blue-700 active:scale-90 transition-all"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
        
        {/* Selected Route Badge */}
        {selectedRoute && (
          <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm border border-white/50">
            {selectedRoute.title}
          </div>
        )}
      </div>

      {/* Routes List */}
      <div className="flex-1 bg-gray-50 overflow-y-auto no-scrollbar pb-24 rounded-t-3xl -mt-6 z-30 shadow-2xl relative border-t border-white/50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-800">Rotas Disponíveis</h2>
             <span className="text-xs text-gray-400">{activeRoutes.length} opções</span>
          </div>

          <div className="space-y-3">
            {sortedRoutes.length === 0 ? (
               <div className="text-center py-8 text-gray-400">
                 <p>Nenhuma rota cadastrada para esta região.</p>
               </div>
            ) : (
              sortedRoutes.map((route) => (
                <div 
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`
                    p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden
                    ${selectedRouteId === route.id 
                      ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-100' 
                      : 'bg-white border-gray-100 hover:border-blue-200'}
                  `}
                >
                  {/* Active Indicator Strip */}
                  {selectedRouteId === route.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500"></div>
                  )}

                  <div className="flex justify-between items-start mb-2 pl-2">
                    <h3 className={`font-bold text-sm ${selectedRouteId === route.id ? 'text-blue-700' : 'text-gray-700'}`}>
                      {route.title}
                    </h3>
                    <div className="flex items-center space-x-1 bg-gray-50 px-2 py-0.5 rounded-md">
                      <ThumbsUp size={12} className={route.upvotes > 50 ? 'text-green-500' : 'text-gray-400'} />
                      <span className="text-xs font-bold text-gray-600">{route.upvotes}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 pl-2 mb-3 line-clamp-2">{route.description}</p>
                  
                  <div className="flex items-center justify-between pl-2 pt-2 border-t border-gray-50">
                    <span className="text-[10px] font-medium text-gray-400 uppercase">Por {route.author}</span>
                    <div className="flex space-x-3">
                       <button 
                         onClick={(e) => { e.stopPropagation(); toggleRouteVote(route.id, true); }} 
                         className="text-gray-400 hover:text-green-600"
                       >
                         <ThumbsUp size={16} />
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); flagRoute(route.id); }}
                         className={`hover:text-red-500 ${route.isFlagged ? 'text-red-500' : 'text-gray-300'}`}
                       >
                         <Flag size={16} />
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Nova Rota em {activeTab}</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome da Rota</label>
                <input 
                  autoFocus
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  placeholder="Ex: Atalho Seguro"
                  value={newRouteTitle}
                  onChange={e => setNewRouteTitle(e.target.value)}
                  required
                />
              </div>
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg text-center bg-gray-50">
                <span className="text-xs text-gray-400">Arraste ou clique para adicionar o desenho da rota</span>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                Criar Rota
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};