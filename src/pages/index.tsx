import { useAuth } from '../context';

export default function Home() {
  const { login, auth, logout } = useAuth();

  return (
    <div>
      {auth.user ? <p>Vous etes connecté</p> : <p>Vous nêtes pas connecté</p>}
      <button onClick={() => login('mickael', 'blop')}>Connexion</button>
      <button onClick={() => logout()}>Déconnexion</button>
    </div>
  );
}
