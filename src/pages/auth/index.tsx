import { useAuth } from '../../context';

export default function Auth() {
  const { login, logout, register, confirmSignup, loginWithGoogle, loginWithFacebook } = useAuth();

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={() => login('mickaelmangaud@gmail.com', '55555wR*')}>Connexion</button>
      <button onClick={() => logout()}>Déconnexion</button>
      <button onClick={() => register('mickael', 'mickaelmangaud@gmail.com', '55555wR*')}>
        Register
      </button>
      <button onClick={() => confirmSignup('mickael', '183783')}>ConfirmSignup</button>
      <button onClick={() => loginWithGoogle()}>Google</button>
      <button onClick={() => loginWithFacebook()}>Facebook</button>
    </div>
  );
}
