export const CONFIG = {
  rootDir: "C:\\Github\\lwc-garden\\examples\\custom-theme",
  modules: [{
    dir: "./.garden/components",
    namespace: "garden"
  }, {
    dir: "./shared-components",
    namespace: "example"
  }],
  theme: {
    light: {
      'font-family': "Gantari",
      background: "260 100% 95%",
      foreground: "260 5% 0%",
      card: "260 50% 90%",
      'card-foreground': "260 5% 10%",
      popover: "260 100% 95%",
      'popover-foreground': "260 100% 0%",
      primary: "260 77% 42%",
      'primary-foreground': "0 0% 100%",
      secondary: "260 30% 70%",
      'secondary-foreground': "0 0% 0%",
      muted: "222 30% 85%",
      'muted-foreground': "260 5% 35%",
      accent: "222 30% 80%",
      'accent-foreground': "260 5% 10%",
      destructive: "0 100% 30%",
      'destructive-foreground': "260 5% 90%",
      border: "260 30% 50%",
      input: "260 30% 18%",
      ring: "260 77% 42%",
      radius: "0rem",
      'container-background': "240 4.8% 95.9%",
      'dialog-background': "20 14.3% 4.1%",
      'dialog-background-alpha': "0.5"
    },
    dark: {
      background: "260 50% 5%",
      foreground: "260 5% 90%",
      card: "260 50% 0%",
      'card-foreground': "260 5% 90%",
      popover: "260 50% 5%",
      'popover-foreground': "260 5% 90%",
      primary: "260 77% 42%",
      'primary-foreground': "0 0% 100%",
      secondary: "260 30% 10%",
      'secondary-foreground': "0 0% 100%",
      muted: "222 30% 15%",
      'muted-foreground': "260 5% 60%",
      accent: "222 30% 15%",
      'accent-foreground': "260 5% 90%",
      destructive: "0 100% 30%",
      'destructive-foreground': "260 5% 90%",
      border: "260 30% 18%",
      input: "260 30% 18%",
      ring: "260 77% 42%",
      'container-background': "0 0% 15%",
      radius: "0rem"
    }
  },
  cacheDir: "C:\\Github\\lwc-garden\\examples\\custom-theme\\.garden",
  port: 3333,
  args: {
    cache: true
  },
  slots: {
    placeholder: true,
    components: {
      default: () => import('garden/placeholder')
    }
  },
  lwc: {
    disableSyntheticShadowSupport: false
  }
};