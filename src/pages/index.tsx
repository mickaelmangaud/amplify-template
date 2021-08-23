import { useAuth } from '../context/authContext';

export default function Home() {
  const { login } = useAuth();

  return <h1 onClick={() => login('mickael', 'blop')}>Next Template</h1>;
}
