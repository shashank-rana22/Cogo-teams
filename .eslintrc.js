module.exports = {
	extends : ['@cogoport/eslint-config/next'],
	rules   : {
		'no-console'      : 'off',
		'react/no-danger' : 'off',
	},
	ignorePatterns : ['cogo-control/dist/**/*', '!.stylelintrc.js'],
	root           : true,
	overrides      : [
		{
			files   : ['**/*.{ts,tsx}'],
			extends : ['@cogoport/eslint-config/react-typescript'],
			rules   : {
				'no-console'      : 'off',
				'react/no-danger' : 'off',
			},
		},
	],
};
