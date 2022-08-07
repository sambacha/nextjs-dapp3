// @ts-check
/**
 * @type {import('next').NextConfig}
 */

require('v8-compile-cache-lib').install(); // faster builds

const packageJson = require('./package.json');
const date = new Date();
const GIT_COMMIT_SHA_SHORT = typeof process.env.GIT_COMMIT_SHA === 'string' && process.env.GIT_COMMIT_SHA.substring(0, 8);


module.exports = {
  reactStrictMode: true,
}

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
  /**
   *  @nextjs
   *  This is used to help provide authentication mechanisms from authorized deployments to the end user.
   *  Ideally, this will be accessed by wallets on their backend to verify the dapp they are interacting with is authentic and has not
   *  been flagged as malicious (e.g. supply chain compromise, etc).
   * 
   *  @description Environment variables added to JS bundle.
   *  @summary All env variables defined in ".env*" files that aren't public (those that don't start with "NEXT_PUBLIC_") 
   *    MUST manually be made available at build time below.
   *    They're necessary on Vercel for runtime execution (SSR, SSG with revalidate, everything that happens server-side will need those).
   *
   *  @see {@link https://nextjs.org/docs/api-reference/next.config.js/environment-variables}
   */
  env: {
    /**
     * @summary API Key Env Variables
     */
    // GITHUB_DISPATCH_TOKEN: process.env.GITHUB_DISPATCH_TOKEN,
    /**
    * @const VERCEL_
    * @see {@link https://vercel.com/docs/environment-variables#system-environment-variables}
    */
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    CI: process.env.CI,
  },
  // experimental: {
  //   nextScriptWorkers: true,
  // },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  swcMinify: false,
  reactStrictMode: true,
  // pwa: {
  //   dest: 'public',
  //   runtimeCaching,
  //   disable: process.env.NODE_ENV === 'development',
  // },
 /* async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'Web-Build', value: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA }]
      }
    ];
  }
 */
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = nextConfig;

// Don't delete this console log, useful to see the config in Vercel deployments
console.log('process.env.VERCEL_GIT_COMMIT_SHA: ', process.env.VERCEL_GIT_COMMIT_SHA);
console.log('process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: ', process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA);
// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2));