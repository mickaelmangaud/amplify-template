import { useAuth } from '../context';

export default function Home() {
  const { login, user, logout, register, confirmSignup, loginWithGoogle } = useAuth();

  return (
    <div>
      <h1>Bonjour {user?.username}</h1>
      <button onClick={() => login('mickaelmangaud@gmail.com', '55555wR*')}>Connexion</button>
      <button onClick={() => logout()}>Déconnexion</button>
      <button onClick={() => register('mickael', 'mickaelmangaud@gmail.com', '55555wR*')}>
        Register
      </button>
      <button onClick={() => confirmSignup('mickael', '094428')}>ConfirmSignup</button>
      <button onClick={() => loginWithGoogle()}>Google</button>
    </div>
  );
}
