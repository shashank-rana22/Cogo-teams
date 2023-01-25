module.exports = {
	extends        : ['@cogoport/eslint-config/next'],
	ignorePatterns : ['cogo-control/dist/**/*', '!.stylelintrc.js'],
	root           : true,
	parserOptions  : { project: './tsconfig.json', tsconfigRootDir: __dirname },
	settings       : {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	overrides: [
		{
			files   : ['**/*.{ts,tsx}'],
			extends : ['@cogoport/eslint-config/react-typescript'],
		},
	],
};
