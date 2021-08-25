import { createContext, useContext, ReactElement, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoUser, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import React from 'react';

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
  errorMessage: string | null;
  user: User | null;
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
};

const AuthContext = createContext<IAuthContext>(initialState);

interface Props {
  children: ReactElement;
}

export function AuthContextProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(setUser).catch(console.log);
  }, []);

  useEffect(() => {
    Hub.listen('auth', capsule => {
      if (capsule) {
        console.log('capsule event', capsule.payload.event);
        setUser(capsule.payload.data);
      }
    });
  }, []);

  async function signup(username: string, email: string, password: string) {
    setErrorMessage(null);
    try {
      await Auth.signUp({ username, password, attributes: { email } });
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function confirmSignup(username: string, code: string) {
    setErrorMessage(null);
    try {
      await Auth.confirmSignUp(username, code);
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function signin(email: string, password: string) {
    setErrorMessage(null);
    try {
      await Auth.signIn(email, password);
      router.push('/');
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function signinWithGoogle() {
    setErrorMessage(null);
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function signinWithFacebook() {
    setErrorMessage(null);
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  async function signout() {
    setErrorMessage(null);
    try {
      await Auth.signOut();
      setUser(null);
      router.push('/');
    } catch (e) {
      setErrorMessage(e.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        user,
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
