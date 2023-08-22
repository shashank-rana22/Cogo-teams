module.exports = {
	extends : ['@cogoport/eslint-config/custom-eslint-rules'],
	rules   : {
		'react/no-danger' : 'off',
		'react/jsx-key'   : 'error',
	},

	ignorePatterns : ['cogo-control/dist/**/*', '!.stylelintrc.js'],
	root           : true,
	env            : {
		browser : true,
		node    : true,
	},
	overrides: [
		{
			files   : ['**/*.{ts,tsx}'],
			extends : ['@cogoport/eslint-config/react-typescript'],
			rules   : {
				'react/no-danger' : 'off',
				'react/jsx-key'   : 'error',
			},
			env: {
				browser : true,
				node    : true,
			},
		},
	],
};
