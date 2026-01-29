import { ConfigContext, ExpoConfig } from "expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.marcelogaldino.app.servicebudget.dev";
  }

  if (IS_PREVIEW) {
    return "com.marcelogaldino.app.servicebudget.preview";
  }

  return "com.marcelogaldino.app.servicebudget";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Service Budget (Dev)";
  }

  if (IS_PREVIEW) {
    return "Service Budget (Preview)";
  }

  return "Service Budget";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "service-budget",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "service-budget",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon-light.png",
    imageWidth: 200,
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },
  ios: {
    supportsTablet: true,
    icon: {
      dark: "./assets/ios-dark.png",
      light: "./assets/ios-light.png",
      tinted: "./assets/ios-tinted.png",
    },
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      monochromeImage: "./assets/adaptive-icon.png",
      backgroundColor: "#6A46EB",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: getUniqueIdentifier(),
  },
  web: {
    favicon: "./assets/favicon.png",
    web: {
      bundler: "metro",
    },
  },
  plugins: [
    [
      "expo-splash-screen",
      {
        backgroundColor: "#FFFFFF",
        image: "./assets/splash-icon-light.png",
        dark: {
          image: "./assets/splash-icon-dark.png",
          backgroundColor: "#000000",
        },
        imageWidth: 200,
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "d8703161-0f84-40ab-9247-20a088fe7f6a",
    },
  },
  owner: "marcelogaldino.app",
});
