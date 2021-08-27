import { useState } from 'react';
import { useAuth } from '../context';

type AuthStep = 'login' | 'register' | 'forgotPassword' | 'confirmRegister';

export default function Auth() {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>('login');

  const {
    signin,
    signup,
    signinWithFacebook,
    signinWithGoogle,
    signout,
    confirmSignup,
    errorMessage,
  } = useAuth();

  const login = e => {
    e.preventDefault();
    signin(email, password);
  };

  const register = e => {
    e.preventDefault();
    signup(username, email, password);
  };

  const confirmRegister = async e => {
    e.preventDefault();
    confirmSignup(username, confirmationCode);
  };

  return (
    <div>
      <div>
        {errorMessage && errorMessage}
        <button onClick={() => setAuthStep('login')}>LOGIN</button>
        <button onClick={() => setAuthStep('register')}>Register</button>
        <button onClick={() => setAuthStep('confirmRegister')}>CONFIRM REGISTER</button>
        <button onClick={() => setAuthStep('forgotPassword')}>FORGOT PASSWORD</button>
        <button onClick={() => signout()}>SIGNOUT</button>
      </div>
      {authStep === 'login' && (
        <form onSubmit={login}>
          <h1>LOGIN</h1>
          <input
            type="text"
            value={email}
            placeholder="Email ..."
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={password}
            placeholder="Password ..."
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Connexion</button>
        </form>
      )}
      {authStep === 'register' && (
        <form onSubmit={register}>
          <h1>REGISTER</h1>
          <input
            type="text"
            value={email}
            placeholder="Email ..."
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={username}
            placeholder="Username ..."
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={password}
            placeholder="Password ..."
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      )}
      {authStep === 'confirmRegister' && (
        <form onSubmit={confirmRegister}>
          <h1>CONFIRM REGISTER</h1>
          <input
            type="text"
            value={username}
            placeholder="Username ..."
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={confirmationCode}
            placeholder="Confirmation Code ..."
            onChange={e => setConfirmationCode(e.target.value)}
          />
          <button type="submit">Confirm Code</button>
        </form>
      )}
      {authStep === 'forgotPassword' && (
        <form>
          <h1>FORGOT PASSWORD</h1>
          <input type="text" value={email} placeholder="Email ..." />
          <button type="submit">Send email</button>
        </form>
      )}
    </div>
  );
}
