import { AppProps } from 'next/app';
import { updatedconfig } from '../utils';
import { GlobalStyles } from '../components/GlobalStyles';
import Amplify from 'aws-amplify';

Amplify.configure(updatedconfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
