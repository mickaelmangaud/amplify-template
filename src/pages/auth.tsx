import router from 'next/router';
import { useState } from 'react';
import { useAuth } from '../context';
import {
  AuthScreen,
  Form,
  Title,
  Input,
  Submit,
  SocialButton,
  Text,
  ForgotPassword,
} from '../styles/auth';

type AuthStep = 'login' | 'register' | 'forgotPassword' | 'confirmRegister';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [authStep, setAuthStep] = useState<AuthStep>('login');

  const {
    signin,
    signup,
    signout,
    confirmSignup,
    errorMessage,
    loading,
    signinWithFacebook,
    signinWithGoogle,
  } = useAuth();

  const login = async e => {
    e.preventDefault();
    if (email && password) {
      await signin(email, password);
    }
  };

  const register = async e => {
    e.preventDefault();
    if (username && email && password) {
      await signup(username, email, password);
      setAuthStep('confirmRegister');
    }
  };

  const confirmRegister = async e => {
    e.preventDefault();
    if (username && confirmationCode) {
      confirmSignup(username, confirmationCode);
    }
  };

  if (loading) {
    return (
      <AuthScreen>
        <Form>LOADING</Form>
      </AuthScreen>
    );
  }

  return (
    <AuthScreen>
      <div>{errorMessage && errorMessage}</div>

      {/* LOGIN */}

      {authStep === 'login' && (
        <Form onSubmit={login}>
          <div>
            <Input
              type="text"
              value={email}
              placeholder="Email ..."
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              value={password}
              placeholder="Password ..."
              onChange={e => setPassword(e.target.value)}
              autoComplete="false"
            />
            <ForgotPassword onClick={() => setAuthStep('forgotPassword')}>
              forgot password
            </ForgotPassword>
          </div>

          <div>
            <Submit type="submit">Connexion</Submit>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SocialButton style={{ backgroundColor: '#3b5998' }} onClick={signinWithFacebook}>
                Facebook
              </SocialButton>
              <SocialButton style={{ backgroundColor: '#E94235' }} onClick={signinWithGoogle}>
                Google
              </SocialButton>
            </div>
            <Text onClick={() => setAuthStep('register')}>
              Don&apos;t have an account?{' '}
              <span style={{ color: 'green', fontWeight: 'bold' }}>Register...</span>
            </Text>
          </div>
        </Form>
      )}

      {/* REGISTER */}

      {authStep === 'register' && (
        <Form>
          <div>
            <Input
              type="text"
              value={username}
              placeholder="Username ..."
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type="password"
              value={password}
              placeholder="Password ..."
              onChange={e => setPassword(e.target.value)}
              autoComplete="false"
            />
            <Input
              type="text"
              value={email}
              placeholder="Email ..."
              onChange={e => setEmail(e.target.value)}
              autoComplete="false"
            />
          </div>
          <div>
            <Submit>register</Submit>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <SocialButton style={{ backgroundColor: '#3b5998' }} onClick={signinWithFacebook}>
                Facebook
              </SocialButton>
              <SocialButton style={{ backgroundColor: '#E94235' }} onClick={signinWithGoogle}>
                Google
              </SocialButton>
            </div>
            <Text onClick={() => setAuthStep('login')}>
              Already registered?{' '}
              <span style={{ color: 'green', fontWeight: 'bold' }}>Sign in...</span>
            </Text>
          </div>
        </Form>
      )}

      {/* CONFIRM REGISTER */}

      {authStep === 'confirmRegister' && (
        <Form onSubmit={confirmRegister}>
          <Input
            type="text"
            value={username}
            placeholder="Username ..."
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type="text"
            value={confirmationCode}
            placeholder="Confirmation Code ..."
            onChange={e => setConfirmationCode(e.target.value)}
          />
          <p>{loading && 'LOADING'}</p>
          <Submit type="submit">Confirm Code</Submit>
        </Form>
      )}

      {/* FORGOT PASSWORD */}

      {authStep === 'forgotPassword' && (
        <Form>
          <Title>FORGOT PASSWORD</Title>
          <Input
            type="text"
            value={email}
            placeholder="Email ..."
            onChange={e => setConfirmationCode(e.target.value)}
          />
          <Submit type="submit">Send email</Submit>
          <p>{loading && 'LOADING'}</p>
          <Text onClick={() => setAuthStep('login')}>Login</Text>
        </Form>
      )}
    </AuthScreen>
  );
}
