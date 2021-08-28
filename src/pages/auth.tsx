import { useState } from 'react';
import { useAuth } from '../context';
import { AuthScreen, Form, Title, Input, Submit } from '../styles/auth';

type AuthStep = 'login' | 'register' | 'forgotPassword' | 'confirmRegister';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');
  const [authStep, setAuthStep] = useState<AuthStep>('login');

  const { signin, signup, signout, confirmSignup, errorMessage, loading } = useAuth();

  const login = e => {
    e.preventDefault();
    if (email && password) {
      signin(email, password);
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

  return (
    <AuthScreen>
      <div>{errorMessage && errorMessage}</div>

      {/* LOGIN */}

      {authStep === 'login' && (
        <Form onSubmit={login}>
          <Title>LOGIN</Title>
          <Input
            type="text"
            value={email}
            placeholder="Email ..."
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="text"
            value={password}
            placeholder="Password ..."
            onChange={e => setPassword(e.target.value)}
          />
          <p onClick={() => setAuthStep('forgotPassword')}>Forgot Password</p>
          <p>{loading && 'LOADING'}</p>
          <Submit type="submit">Connexion</Submit>
          <p onClick={() => setAuthStep('register')}>Don&apos;t have an account? Register...</p>
        </Form>
      )}

      {/* REGISTER */}

      {authStep === 'register' && (
        <Form onSubmit={register}>
          <Title>REGISTER</Title>
          <Input
            type="text"
            value={email}
            placeholder="Email ..."
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="text"
            value={username}
            placeholder="Username ..."
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            type="text"
            value={password}
            placeholder="Password ..."
            onChange={e => setPassword(e.target.value)}
          />
          <p>{loading && 'LOADING'}</p>
          <Submit type="submit">Register</Submit>
          <p onClick={() => setAuthStep('login')}>Already an account? Login...</p>
        </Form>
      )}

      {/* CONFIRM REGISTER */}

      {authStep === 'confirmRegister' && (
        <Form onSubmit={confirmRegister}>
          <Title>CONFIRM REGISTER</Title>
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
          <p onClick={() => setAuthStep('login')}>Login</p>
        </Form>
      )}
    </AuthScreen>
  );
}
