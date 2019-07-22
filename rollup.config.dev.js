import { eslint } from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import sourceMaps from 'rollup-plugin-sourcemaps';
// import pkg from './package.json';
import path from 'path';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default {
  input: path.join(__dirname, 'src', 'index.js'),
  external: [...Object.keys(pkg.dependencies || {})],
  output: [
    {
      file: path.join(__dirname, 'lib', 'main.bundle.js'),
      format: 'iife',
      name: 'fe_utils',
      sourcemap: true
    },
    {
      file: path.join(__dirname, 'lib', 'main.js'),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: path.join(__dirname, 'lib', 'main.es.js'),
      format: 'es',
      sourcemap: true
    }
  ],
  watch: {
    chokidar: true,
    exclude: ['node_modules/**']
  },
  plugins: [
    del({
      targets: 'lib/*'
    }),
    eslint({
      fix: true
    }),
    json(),
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
    sourceMaps()
  ]
};
