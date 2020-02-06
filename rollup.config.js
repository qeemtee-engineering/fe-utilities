import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';
import gzip from 'rollup-plugin-gzip';
import filesize from 'rollup-plugin-filesize';
import del from 'rollup-plugin-delete';
import path from 'path';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default {
  input: {
    index: path.join(__dirname, 'src', 'index.js'),
    constants: path.join(__dirname, 'src', 'lib', 'constants', 'index.js'),
    helpers: path.join(__dirname, 'src', 'lib', 'helpers', 'index.js'),
    services: path.join(__dirname, 'src', 'lib', 'services', 'index.js')
  },
  external: [...Object.keys(pkg.dependencies || {})],
  output: [
    {
      dir: path.join(__dirname, 'lib', 'cjs'),
      format: 'cjs'
    },
    {
      dir: path.join(__dirname, 'lib', 'esm'),
      format: 'esm'
    }
  ],
  plugins: [
    del({
      targets: 'lib/*'
    }),
    json(),
    resolve(),
    commonjs(),
    babel({
      exclude: ['node_modules/**']
    }),
    minify({
      comments: false
    }),
    terser(),
    sourceMaps(),
    gzip({
      gzipOptions: {
        level: 9
      },
      minSize: 1000,
      additionalFilesDelay: 5000
    }),
    filesize({
      showGzippedSize: true
    })
  ]
};
