import { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';
import Amplify from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
