import { useAuth } from '../context';

export default function Home() {
  const { user, signout } = useAuth();

  const logout = async e => {
    e.preventDefault();
    await signout();
  };

  return (
    <div>
      <button onClick={logout}>SIGNOUT</button>
      <h1>
        Bonjour {user?.email} - {user?.username}
      </h1>
    </div>
  );
}
