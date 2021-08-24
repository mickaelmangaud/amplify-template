import { createContext, useContext, ReactElement, useState, useEffect } from 'react';

interface IAuht {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
}

interface IAuthContext {
  auth: IAuht;
  register?(email: string, password: string): Promise<void>;
  login?(email: string, password: string): Promise<void>;
  logout?(): Promise<void>;
}

const initialState = {
  auth: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
};

const AuthContext = createContext<IAuthContext>(initialState);

interface AuthContextProviderProps {
  children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): ReactElement {
  const [isInitialized, setIsInitialized] = useState(false);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    async function checkUser() {
      const auth = localStorage.getItem('auth');
      auth && setAuth(JSON.parse(auth));
    }
    checkUser();
    setIsInitialized(true);
  }, []);

  /* Save store each time it changes, if already initialized */
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  });

  async function register(email, password) {
    try {
    } catch (e) {}
  }

  async function login(email, password) {
    try {
      setAuth({
        error: null,
        isAuthenticated: true,
        user: 'mickael',
      });
    } catch (e) {}
  }

  async function logout() {
    setAuth({
      error: null,
      isAuthenticated: false,
      user: null,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
