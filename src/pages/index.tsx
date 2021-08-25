import { useAuth } from '../context';

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>
        Bonjour {user?.attributes?.email} - {user?.username}
      </h1>
    </div>
  );
}
