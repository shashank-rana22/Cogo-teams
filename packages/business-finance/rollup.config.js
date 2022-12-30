import commonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import { swc } from 'rollup-plugin-swc3';

export default ({ watch }) => defineConfig({
	input: {
		index: 'index.tsx',
	},
	output: [
		{
			dir       : 'dist/es',
			format    : 'esm',
			sourcemap : true,
		},
		{
			dir       : 'dist/cjs',
			format    : 'cjs',
			exports   : 'named',
			sourcemap : true,
		},
	],
	external: [
		'react', 'react-dom',
		'next', 'next/link', 'next/router',
		'@cogoport/icons-react',
	],
	plugins: [
		...(watch ? [] : [del({ targets: 'dist/*' })]),
		nodeResolve(),
		commonJs(),
		swc({
			include  : /\.[jt]sx?$/,
			exclude  : /node_modules/,
			tsconfig : 'tsconfig.json',
			jsc      : {},
			minify   : true,
		}),
		json(),
	],
});
