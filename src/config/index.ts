function config() {
  return {
    port: process.env.PORT || 8080,
    bridge: {
      baseURL: process.env.BASE_BRIDGE_API,
    },
  };
}
export default config;
