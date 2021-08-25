import { createContext, useContext, ReactElement, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { CognitoUser, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { useRouter } from 'next/router';

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
  signup?(username: string, email: string, password: string): Promise<void>;
  confirmSignup?(username: string, code: string): Promise<void>;
  signin?(email: string, password: string): Promise<void>;
  signinWithGoogle?(): Promise<void>;
  signinWithFacebook?(): Promise<void>;
  signout?(): Promise<void>;
}

const initialState = {
  user: null,
};

const AuthContext = createContext<IAuthContext>(initialState);

interface Props {
  children: ReactElement;
}

export function AuthContextProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(setUser).catch(console.log);
  }, []);

  useEffect(() => {
    Hub.listen('auth', hubCapsule => {
      if (hubCapsule) {
        setUser(hubCapsule.payload.data);
      }
    });
  }, []);

  async function signup(username: string, email: string, password: string) {
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

  async function signin(email: string, password: string) {
    try {
      await Auth.signIn(email, password);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  async function signinWithGoogle() {
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
    } catch (e) {
      console.log(e);
    }
  }

  async function signinWithFacebook() {
    try {
      await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
    } catch (e) {
      console.log(e);
    }
  }

  async function signout() {
    await Auth.signOut();
    setUser(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
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
