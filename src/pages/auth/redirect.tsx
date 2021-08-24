import { useRouter } from 'next/router';

export default function Redirect() {
  const router = useRouter();
  return <div>Code : ${router.query.code}</div>;
}
