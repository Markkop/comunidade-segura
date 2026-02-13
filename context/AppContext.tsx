import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EscapeRoute, Report, User, IncidentType } from '../types';
import { INITIAL_REPORTS, INITIAL_ROUTES } from '../services/mockData';

interface AppState {
  user: User;
  reports: Report[];
  routes: EscapeRoute[];
  addReport: (report: Omit<Report, 'id' | 'timestamp' | 'likes' | 'verified' | 'author'>) => void;
  addRoute: (route: Omit<EscapeRoute, 'id' | 'upvotes' | 'downvotes' | 'isFlagged' | 'createdAt' | 'author'>) => void;
  toggleRouteVote: (id: string, isUpvote: boolean) => void;
  flagRoute: (id: string) => void;
  likeReport: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<User>({
    id: 'u1',
    name: 'Usuário Atual',
    avatarUrl: 'https://ui-avatars.com/api/?name=User&background=random',
    isAuthenticated: true,
  });

  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [routes, setRoutes] = useState<EscapeRoute[]>(INITIAL_ROUTES);

  const addReport = (newReportData: Omit<Report, 'id' | 'timestamp' | 'likes' | 'verified' | 'author'>) => {
    const newReport: Report = {
      ...newReportData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      likes: 0,
      verified: false,
      author: user.name,
    };
    setReports(prev => [newReport, ...prev]);
  };

  const addRoute = (newRouteData: Omit<EscapeRoute, 'id' | 'upvotes' | 'downvotes' | 'isFlagged' | 'createdAt' | 'author'>) => {
    const newRoute: EscapeRoute = {
      ...newRouteData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      upvotes: 0,
      downvotes: 0,
      isFlagged: false,
      author: user.name,
    };
    setRoutes(prev => [newRoute, ...prev]);
  };

  const toggleRouteVote = (id: string, isUpvote: boolean) => {
    setRoutes(prev => prev.map(route => {
      if (route.id !== id) return route;
      return {
        ...route,
        upvotes: isUpvote ? route.upvotes + 1 : route.upvotes,
        downvotes: !isUpvote ? route.downvotes + 1 : route.downvotes,
      };
    }));
  };

  const flagRoute = (id: string) => {
    setRoutes(prev => prev.map(route => {
        if (route.id !== id) return route;
        return { ...route, isFlagged: true };
    }));
  };

  const likeReport = (id: string) => {
    setReports(prev => prev.map(report => {
        if (report.id !== id) return report;
        return { ...report, likes: report.likes + 1 };
    }));
  };

  return (
    <AppContext.Provider value={{ user, reports, routes, addReport, addRoute, toggleRouteVote, flagRoute, likeReport }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};