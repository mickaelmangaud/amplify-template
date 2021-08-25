import { useAuth } from '../../context';

export default function Auth() {
  const { signin, signout, signup, confirmSignup, signinWithGoogle, signinWithFacebook } =
    useAuth();

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={() => signin('mickaelmangaud@gmail.com', '55555wR*')}>Connexion</button>
      <button onClick={() => signout()}>Déconnexion</button>
      <button onClick={() => signup('mickael', 'mickaelmangaud@gmail.com', '55555wR*')}>
        Register
      </button>
      <button onClick={() => confirmSignup('mickael', '924429')}>ConfirmSignup</button>
      <button onClick={() => signinWithGoogle()}>Google</button>
      <button onClick={() => signinWithFacebook()}>Facebook</button>
    </div>
  );
}
