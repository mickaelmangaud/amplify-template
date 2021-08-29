import config from '../aws-exports';

export let isLocalhost = true;

/* https://docs.amplify.aws/lib/auth/social/q/platform/js/#configure-auth-category */
if (!(typeof window === 'undefined')) {
  isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
}

const [localRedirectSignIn, productionRedirectSignIn] =
  config.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, productionRedirectSignOut] =
  config.oauth.redirectSignOut.split(',');

export const updatedconfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};
