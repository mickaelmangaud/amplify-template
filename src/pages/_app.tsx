import { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';
import Amplify from 'aws-amplify';
import config from '../aws-exports';
import Link from 'next/link';

Amplify.configure({ ...config, ssr: true });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <div>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth">Auth</Link>
            </li>
          </ul>
        </nav>
        <Component {...pageProps} />
      </div>
    </AuthContextProvider>
  );
}
