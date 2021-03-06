import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@GoBarber:token');
      const user = await AsyncStorage.getItem('@GoBarber:user');

      if (token && user) {
        api.defaults.headers.authorization = `Bearer: ${token}`;
        setData({ token, user: JSON.parse(user) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    /*     await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    Thias multi set is doing the same as (we have multiGet too)
    await AsyncStorage.setItem('@GoBarber:token', token);
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
    */

    await AsyncStorage.setItem('@GoBarber:token', token);
    await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer: ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    // await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    await AsyncStorage.removeItem('@GoBarber:token');
    await AsyncStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AiuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
