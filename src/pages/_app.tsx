import { AppProps } from 'next/app';
import { AuthContextProvider } from '../context/authContext';
import Amplify from 'aws-amplify';
import Link from 'next/link';
import { updatedconfig } from '../utils';
import { GlobalStyles } from '../components/GlobalStyles';

Amplify.configure(updatedconfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    </AuthContextProvider>
  );
}
