import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    browser: {
      enabled: true,
      name: "chrome",
    },
  },
});
