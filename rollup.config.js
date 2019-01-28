import typescript from 'rollup-plugin-typescript';

export default {
  entry: './src/index.ts',
  dest: './dist/bundle.js',
  format: 'es6',
  plugins: [
    typescript()
  ]
}