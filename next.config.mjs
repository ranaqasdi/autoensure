/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Ignore .map files during the build
      config.module.rules.push({
        test: /\.map$/,
        use: 'ignore-loader',
      });
  
      if (!isServer) {
        // Prevent `chrome-aws-lambda` from being included in client-side bundles
        config.resolve.alias['chrome-aws-lambda'] = false;
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  