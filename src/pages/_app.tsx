import { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
