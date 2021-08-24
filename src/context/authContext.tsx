import { createContext, useContext, ReactElement, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

// Fix (le type CognitoUser renvoie un truc bizarre)
interface User extends CognitoUser {
  attributes: {
    sub: string;
    email: string;
    email_verified: string;
  };
  username: string;
}

interface IAuthContext {
  user: User;
  register?(username: string, email: string, password: string): Promise<void>;
  confirmSignup?(username: string, code: string): Promise<void>;
  login?(email: string, password: string): Promise<void>;
  loginWithGoogle?(): Promise<void>;
  logout?(): Promise<void>;
}

const initialState = {
  user: null,
};

const AuthContext = createContext<IAuthContext>(initialState);

interface AuthContextProviderProps {
  children: ReactElement;
}

export function AuthContextProvider({ children }: AuthContextProviderProps): ReactElement {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function checkUser() {
      const auth = await Auth.currentAuthenticatedUser();
      if (auth) {
        setUser(auth);
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen('auth', hubCapsule => {
      if (hubCapsule) {
        setUser(hubCapsule.payload.data);
      }
    });
  }, []);

  async function register(username: string, email: string, password: string) {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
    } catch (e) {
      console.log(e);
    }
  }

  async function confirmSignup(username: string, code: string) {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (e) {
      console.log(e);
    }
  }

  async function login(email: string, password: string) {
    try {
      await Auth.signIn(email, password);
    } catch (e) {
      console.log(e);
    }
  }

  async function loginWithGoogle() {
    try {
      await Auth.federatedSignIn({ provider: 'Google' });
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    await Auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        confirmSignup,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
