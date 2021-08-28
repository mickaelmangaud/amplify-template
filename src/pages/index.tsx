import { useAuth } from '../context';
import { useRouter } from 'next/router';

export default function Home() {
  const { user, signout } = useAuth();
  const router = useRouter();

  const logout = async e => {
    e.preventDefault();
    await signout();
    router.push('/auth');
  };
  console.log(user);

  return (
    <div>
      <button onClick={logout}>SIGNOUT</button>
      <h1>
        Bonjour {user?.email} - {user?.username}
      </h1>
    </div>
  );
}
