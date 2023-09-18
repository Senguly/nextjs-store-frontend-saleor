const dotenv = require("dotenv");

const config = {
  ...dotenv.config().parsed,
  ...dotenv.config({ path: ".env.local" }).parsed,
};

const getApiUrl = () => {
  // if (typeof window !== "undefined") {
  //   const { protocol, hostname } = window.location;
  //   return `${protocol}//${hostname}/graphql`;
  // }
  // return config.NEXT_PUBLIC_API_URI;

  const isCheckCurDomain =
    config.NEXT_PUBLIC_API_WITH_CURRENT_DOMAIN === "true";
  if (isCheckCurDomain) {
    if (typeof window !== "undefined") {
      const { protocol, hostname } = window.location;
      return `${protocol}//${hostname}/graphql`;
    }
    return config.NEXT_PUBLIC_API_URI;
  }
  return config.NEXT_PUBLIC_API_URI;
};

module.exports = {
  client: {
    excludes: ["**/__tests__/**/*", "**/@sdk/**/*"],
    service: {
      url: getApiUrl(),
    },
  },
};
