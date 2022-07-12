import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default [
    {
        input: "src/index.tsx",
        output: [
        { file: pkg.main, format: 'cjs', sourcemap: true, name: 'react-parallax-fx' },
        { file: pkg.module, format: 'esm', sourcemap: true },
        { file: 'dist/index.d.ts', format: "esm", sourcemap: true}
        ],
        plugins: [
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env','@babel/preset-react']
        }),
        external(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        terser()
        ],
        
        external: Object.keys(pkg.peerDependencies)

    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: "esm" }],
        external: [/\.css$/],
        plugins: [dts()],
},
]