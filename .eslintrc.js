module.exports = {
	extends        : ['@cogoport/eslint-config/next'],
	ignorePatterns : ['cogo-control/dist/**/*', '!.stylelintrc.js'],
	root           : true,
	overrides      : [
		{
			files   : ['**/*.{ts,tsx}'],
			extends : ['@cogoport/eslint-config/react-typescript'],
			rules   : {
				'no-unused-expressions' : 'off',
				curly                   : 2,
			},
		},
	],
};
