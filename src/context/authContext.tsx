import { createContext, useContext, ReactElement, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

interface IAuht {
  isAuthenticated: boolean;
  user: string | null;
  error: string | null;
}

interface IAuthContext {
  auth: IAuht;
  register?(email: string, password: string): Promise<void>;
  confirmSignup?(username: string, code: string): Promise<void>;
  login?(email: string, password: string): Promise<void>;
  loginWithGoogle?(): Promise<void>;
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
      if (auth) {
        setAuth(JSON.parse(auth));
      }
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

  useEffect(() => {
    Hub.listen('auth', user => {
      console.log('USER', user);
    });
  }, []);

  async function register(email, password) {
    try {
      const res = await Auth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function confirmSignup(username: string, code: string) {
    try {
      const res = await Auth.confirmSignUp(username, code);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  async function login(email, password) {
    try {
      const user = await Auth.signIn(email, password);
      console.log(auth);
    } catch (e) {
      console.log(e);
    }
  }

  async function loginWithGoogle() {
    try {
      // await Auth.federatedSignIn({ provider: 'Google'});
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    setAuth({
      error: null,
      isAuthenticated: false,
      user: null,
    });
  }

  return (
    <AuthContext.Provider value={{ auth, register, login, logout, confirmSignup, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
