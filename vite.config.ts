import React from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: process.env.VITEST ? "." : "web",
  plugins: [React(), Icons({ compiler: "jsx", jsx: "react" }), WindiCSS()],
  publicDir: "./assets",
  test: {
    include: ["**/*.test.{ts,tsx}"],
  },
});
