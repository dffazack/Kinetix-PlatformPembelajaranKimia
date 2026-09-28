'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/lib/types';
import { SEED_USERS, StorageService } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  loginTeacher: (password: string) => Promise<boolean>;
  registerStudent: (name: string, email: string, school: string) => Promise<boolean>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize current user from localStorage or fallback to default student
    const existing = StorageService.getCurrentUser();
    if (existing) {
      setUser(existing);
    } else {
      // Default to student 1 for immediate preview
      const defaultUser = SEED_USERS[1]; // Budi Pratama
      setUser(defaultUser);
      StorageService.setCurrentUser(defaultUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, expectedRole?: UserRole): Promise<boolean> => {
    const users = StorageService.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      if (expectedRole && found.role !== expectedRole) {
        return false;
      }
      setUser(found);
      StorageService.setCurrentUser(found);
      return true;
    }
    return false;
  };

  const loginTeacher = async (password: string): Promise<boolean> => {
    // PRD: Teacher login with special password without public registration
    if (password === 'guru123' || password === 'admin' || password === 'kinetix2026') {
      const teacher = SEED_USERS.find(u => u.role === 'TEACHER') || SEED_USERS[0];
      setUser(teacher);
      StorageService.setCurrentUser(teacher);
      return true;
    }
    return false;
  };

  const registerStudent = async (name: string, email: string, school: string): Promise<boolean> => {
    const users = StorageService.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return false; // Email already taken
    }

    const newStudent: User = {
      id: `student-${Date.now()}`,
      name,
      email,
      role: 'STUDENT',
      school: school || 'SMA Negeri',
      avatar: '👨‍🎓',
    };

    StorageService.saveUser(newStudent);
    setUser(newStudent);
    StorageService.setCurrentUser(newStudent);
    return true;
  };

  const logout = () => {
    setUser(null);
    StorageService.setCurrentUser(null);
  };

  const switchDemoRole = (role: UserRole) => {
    const targetUser = SEED_USERS.find(u => u.role === role) || (role === 'TEACHER' ? SEED_USERS[0] : SEED_USERS[1]);
    setUser(targetUser);
    StorageService.setCurrentUser(targetUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginTeacher,
        registerStudent,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
