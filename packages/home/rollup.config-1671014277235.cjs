'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonJs = require('@rollup/plugin-commonjs');
var json = require('@rollup/plugin-json');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var rollup = require('rollup');
var del = require('rollup-plugin-delete');
var typescript = require('rollup-plugin-typescript2');

var rollup_config = ({ watch }) => rollup.defineConfig({
	input: {
		index: 'page-components/index.ts',
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
		pluginNodeResolve.nodeResolve(),
		commonJs(),
		typescript({
			useTsconfigDeclarationDir : true,
			tsconfig                  : 'tsconfig.json',
			tsconfigOverride          : { compilerOptions: { declaration: true, declarationDir: 'dist/types' } },
		}),
		json(),
	],
});

exports.default = rollup_config;
