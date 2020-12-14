import { join } from "path";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import babel from "rollup-plugin-babel";
import svelte from "rollup-plugin-svelte";
import postcss from "rollup-plugin-postcss";
// import browsersync from "rollup-plugin-browsersync";
import { terser } from "rollup-plugin-terser";

import preprocessor from "svelte-preprocess";

import config from "sapper/config/rollup.js";
import pkg from "./package.json";

const { NODE_ENV, SAPPER_LEGACY_BUILD } = process.env;
const dev = NODE_ENV !== "production";
const legacy = !!SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === "THIS_IS_UNDEFINED" ||
  onwarn(warning);

const dedupe = (importee) =>
  importee === "svelte" || importee.startsWith("svelte/");

// const plugins = [
//   require("postcss-import")(),
//   require("tailwindcss"),
//   require("autoprefixer"),
//   ...(dev
//     ? []
//     : [
//       require("cssnano")(),
//       require("@fullhuman/postcss-purgecss")({
//         content: ["./**/*.html", "./**/*.svelte"],
//         defaultExtractor: (content) =>
//           content.match(/[A-Za-z0-9-_:/]+/g) || [],
//       }),
//     ]),
// ];

// const preprocess = preprocessor({
//   transformers: {
//     postcss: {
//       plugins,
//     },
//   },
// });

const preprocess = preprocessor({
  postcss: true,
  typescript: true,
});

const paths = {
  // resolve: [".css", ".svelte"],
  entries: [
    { find: "src", replacement: join(__dirname, "src") },
    {
      find: "actions",
      replacement: join(__dirname, "src", "actions"),
    },
    {
      find: "components",
      replacement: join(__dirname, "src", "components"),
    },
    {
      find: "models",
      replacement: join(__dirname, "src", "models"),
    },
    {
      find: "stores",
      replacement: join(__dirname, "src", "stores"),
    },
    {
      find: "utils",
      replacement: join(__dirname, "src", "utils"),
    },
    {
      find: "typings",
      replacement: join(__dirname, "typings"),
    },
    { find: "static", replacement: join(__dirname, "static") },
  ],
};

export default {
  client: {
    input: config.client.input().replace(/\.js$/, ".ts"),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      }),
      alias(paths),
      resolve({
        preferBuiltins: false,
        browser: true,
        dedupe,
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      commonjs(),
      typescript({ sourceMap: dev }),
      json(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: true,
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },

  server: {
    input: config.server.input().server.replace(/\.js$/, ".ts"),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      }),
      alias(paths),
      resolve({
        dedupe,
      }),
      svelte({
        generate: "ssr",
        hydratable: true,
        dev,
        preprocess,
      }),
      commonjs(),
      typescript({ sourceMap: dev }),
      json(),
      postcss({
        extract: join(__dirname, "static", "css", "main.css"),
      }),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      alias(paths),
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      }),
      commonjs(),

      !dev && terser(),
    ],

    onwarn,
  },
};
