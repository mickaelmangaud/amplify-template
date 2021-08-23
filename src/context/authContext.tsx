import {
  createContext,
  useContext,
  ReactElement,
  useState,
  useEffect,
} from 'react';

interface IAuht {
  isAuthenticated: boolean;
  user: object | null;
  error: string | null;
}

interface IAuthContext {
  auth: IAuht;
  register?(email: string, password: string): Promise<void>;
  login?(email: string, password: string): Promise<void>;
  logout?(): Promise<void>;
}

const defaultValue = {
  auth: {
    isAuthenticated: false,
    user: null,
    error: null,
  },
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext<IAuthContext>(defaultValue);

export function AuthContextProvider({ children }): ReactElement {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    async function checkUser() {}
    checkUser();
  }, []);

  async function register(email, password) {
    try {
    } catch (e) {}
  }
  async function login(email, password) {
    try {
    } catch (e) {}
  }
  async function logout() {}

  return (
    <AuthContext.Provider value={{ auth, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
