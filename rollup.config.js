import path from "path";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json"];
const env = process.env.NODE_ENV;

const commonPlugins = () => [
  external({
    includeDependencies: true,
  }),
  babel({
    babelrc: false,
    presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
    extensions: EXTENSIONS,
    exclude: [
        "node_modules/**", "src/stories/**", ".storybook/**",
        "bckup/**", "webpack/**", "types/**", "dist/**",
    ],
  }),
  commonjs({
    include: /node_modules/,
  }),
  replace({ "process.env.NODE_ENV": JSON.stringify(env) }),
  resolve({
    extensions: EXTENSIONS,
    preferBuiltins: false,
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "styled-components": "styled-components",
    },
  }),
  typescript({ tsconfig: "./tsconfig.json", sourceMap: true }),
  terser(),
];

const config = [
  {
    input: "src/index.ts",
    output: [
      {
        esModule: false,
        file: pkg.unpkg,
        format: "umd",
        name: "react-parallax-pro",
        exports: "named",
        sourcemap: true,
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "styled-components": "styled",
        },
      },
    ],
    plugins: [...commonPlugins()],
    external: Object.keys(pkg.peerDependencies),
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        exports: "named",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [...commonPlugins()],
    external: Object.keys(pkg.peerDependencies),
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "umd" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];

export default config;
