module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // 'nativewind/babel',
      "react-native-reanimated/plugin",
      "module-resolver",
      {
        alias: {
          "@": "./src/",
        },
      },
    ],
  };
};

module.exports = function async(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
  };
};
