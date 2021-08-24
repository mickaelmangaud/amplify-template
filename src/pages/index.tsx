import { useAuth } from '../context';
import { Auth } from 'aws-amplify';

export default function Home() {
  const { login, auth, logout, register, confirmSignup, loginWithGoogle } = useAuth();
  const getUser = async () => await Auth.currentAuthenticatedUser();
  console.log('getUser', getUser());
  return (
    <div>
      {auth.user ? <p>Vous etes connecté</p> : <p>Vous nêtes pas connecté</p>}
      <button onClick={() => login('mickaelmangaud@gmail.com', '55555wR*')}>Connexion</button>
      <button onClick={() => logout()}>Déconnexion</button>
      <button onClick={() => register('mickaelmangaud@gmail.com', '55555wR*')}>Register</button>
      <button onClick={() => confirmSignup('mickaelmangaud@gmail.com', '904016')}>
        ConfirmSignup
      </button>
      <button onClick={() => loginWithGoogle()}>Google</button>
    </div>
  );
}
