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
