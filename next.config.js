/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["flowbite-react"]);

const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
