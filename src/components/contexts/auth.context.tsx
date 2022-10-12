import { createContext, useState } from 'react';
import { User } from '../../types/data.types';
import { ChildrenProps } from '../../types/props.types';

export type AuthContextValue = [authUser: User, setAuthUser: (authUser: User) => void]

export const AuthContext = createContext<AuthContextValue>([ null, null ]);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [authUser, setAuthUser] = useState<User>();
  return (
    <AuthContext.Provider value={[ authUser, setAuthUser ]}>
      {children}
    </AuthContext.Provider>
  );
}
