import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  css: {
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "valor-mobile",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "moment", "lodash", "classnames", "react-selectable-fast", "antd"],
      output: {
        globals: {
          react: "React",
          "react-dom": "react-dom",
          moment: "moment",
          lodash: "_",
          classnames: "classnames",
          "react-selectable-fast": "reactSelectableFast",
        },
      },
    },
  },
});