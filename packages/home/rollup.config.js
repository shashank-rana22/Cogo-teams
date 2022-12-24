import commonJs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import typescript from 'rollup-plugin-typescript2';

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
		typescript({
			useTsconfigDeclarationDir : true,
			tsconfig                  : 'tsconfig.json',
			tsconfigOverride          : { compilerOptions: { declaration: true, declarationDir: 'dist/types' } },
		}),
		json(),
	],
});
