export enum IncidentType {
  THEFT = 'Roubo/Furto',
  HARASSMENT = 'Assédio',
  SUSPICIOUS = 'Atitude Suspeita',
  VANDALISM = 'Vandalismo',
  MEDICAL = 'Emergência Médica',
  FIRE = 'Incêndio/Perigo',
  OTHER = 'Outro'
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Report {
  id: string;
  type: IncidentType;
  description: string;
  timestamp: number;
  location?: Location;
  author: string;
  likes: number;
  verified: boolean;
}

export interface EscapeRoute {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Placeholder for map image
  location: string; // e.g., "UFSC - CTC"
  author: string;
  upvotes: number;
  downvotes: number;
  isFlagged: boolean;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isAuthenticated: boolean;
}