const env =
  process.env.NODE_ENV === "production" ? "production" : "development";
const myVariables = [
  {
    name: "backendApi",
    urls: {
      development: new URL(process.env.NEXT_PUBLIC_MYAPP_BACKEND_LOCAL).origin,
      production: new URL(process.env.NEXT_PUBLIC_MYAPP_BACKEND).origin,
    },
  },
  {
    name: "usdToBs",
    urls: {
      production: process.env.NEXT_PUBLIC_MYAPP_USD_TO_BS,
      development: process.env.NEXT_PUBLIC_MYAPP_USD_TO_BS,
    },
  },
];
myVariables.forEach((i) => (module.exports[i.name] = i.urls[env]));
