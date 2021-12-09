// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  homePath: () => '/',
  loginPath: () => [host, 'login'].join('/'),
  signupPath: () => [host, 'signup'].join('/'),
  apiInitialStatePath: () => [host, prefix, 'data'].join('/'),
  apiLoginPath: () => [host, prefix, 'login'].join('/'),
  apiSignupPath: () => [host, prefix, 'signup'].join('/'),
};
