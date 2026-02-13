import { EscapeRoute, IncidentType, Report } from '../types';

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'r1',
    type: IncidentType.SUSPICIOUS,
    description: 'Indivíduo suspeito olhando carros perto do estacionamento do CSE.',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    location: { lat: -27.601, lng: -48.518, address: 'UFSC - Estacionamento' },
    author: 'Estudante123',
    likes: 5,
    verified: true,
  },
  {
    id: 'r2',
    type: IncidentType.THEFT,
    description: 'Bicicleta roubada perto da entrada da biblioteca central.',
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    location: { lat: -27.602, lng: -48.519, address: 'Biblioteca Central' },
    author: 'Anonimo',
    likes: 12,
    verified: false,
  },
];

export const INITIAL_ROUTES: EscapeRoute[] = [
  {
    id: 'm1',
    title: 'Rota Segura: CSE -> Reitoria',
    description: 'Evita a área escura do bosque. Iluminação reforçada neste trajeto.',
    imageUrl: 'https://images.unsplash.com/photo-1554755229-ca4470e07232?q=80&w=600&auto=format&fit=crop', // Abstract map-like image
    location: 'UFSC',
    author: 'SegurancaCampus',
    upvotes: 89,
    downvotes: 2,
    isFlagged: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: 'm3',
    title: 'Saída Rápida: Biblioteca',
    description: 'Atalho pelo bloco B para evitar aglomerações na entrada principal.',
    imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop',
    location: 'UFSC',
    author: 'Veterano_Civil',
    upvotes: 42,
    downvotes: 1,
    isFlagged: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 'm2',
    title: 'Emergência: Mercado Público',
    description: 'Rotas de evacuação em caso de enchentes ou tumulto no centro histórico.',
    imageUrl: 'https://images.unsplash.com/photo-1577086664693-894553052523?q=80&w=600&auto=format&fit=crop',
    location: 'Centro',
    author: 'DefesaCivil',
    upvotes: 156,
    downvotes: 5,
    isFlagged: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
];