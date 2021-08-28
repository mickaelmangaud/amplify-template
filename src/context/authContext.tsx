import { createContext, useContext, ReactElement, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import React from 'react';

// (le type CognitoUser renvoie un truc bizarre)
interface User {
  sub: string;
  email: string;
  email_verified: boolean;
  username: string;
}

interface IAuthContext {
  errorMessage: string | null;
  user: User | null;
  loading: boolean;
  signup?(username: string, email: string, password: string): Promise<void>;
  confirmSignup?(username: string, code: string): Promise<void>;
  signin?(email: string, password: string): Promise<void>;
  signinWithGoogle?(): Promise<void>;
  signinWithFacebook?(): Promise<void>;
  signout?(): Promise<void>;
}

const initialState = {
  user: null,
  errorMessage: null,
  loading: false,
};

const AuthContext = createContext<IAuthContext>(initialState);

interface Props {
  children: ReactElement;
}

export function AuthContextProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const saveUser = (user: any) =>
    setUser({
      email: user.attributes.email,
      username: user.username,
      sub: user.attributes.sub,
      email_verified: user.attributes.email_verified,
    });

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(saveUser).catch(console.log);
  }, []);

  useEffect(() => {
    Hub.listen('auth', capsule => {
      switch (capsule.payload.event) {
        case 'signIn':
          Auth.currentAuthenticatedUser().then(saveUser).catch(console.log);
      }
    });
  }, []);

  async function signup(username: string, email: string, password: string) {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.signUp({ username, password, attributes: { email } });
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function confirmSignup(username: string, code: string) {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.confirmSignUp(username, code);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function signin(email: string, password: string) {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.signIn(email, password);
      router.push('/');
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function signinWithGoogle() {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function signinWithFacebook() {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function signout() {
    setLoading(true);
    setErrorMessage(null);
    try {
      await Auth.signOut();
      setUser(null);
      router.push('/auth');
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        user,
        loading,
        signup,
        signinWithGoogle,
        signinWithFacebook,
        confirmSignup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
