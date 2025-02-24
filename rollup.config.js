import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

const config = [
	{
		input: 'src/index.ts',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: [
			del({ targets: ['dist/*'] }),
			typescript({ typescript: require('typescript'), module: 'ESNext' }),
			peerDepsExternal(),
			resolve(),
			commonjs(),
			image(),
			terser(), // minifies generated bundles
		],
		external: Object.keys(pkg.peerDependencies || {}),
	},
];

export default config;
