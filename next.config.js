const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
};

module.exports = withPWA(nextConfig);
