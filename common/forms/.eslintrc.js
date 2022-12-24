module.exports = {
	extends        : ['@cogoport/eslint-config/react-typescript'],
	ignorePatterns : ['dist/**/*', '!.stylelintrc.js'],
	root           : true,
	overrides      : [
		{
			files : ['*.js', '*.jsx'],
			rules : {
				'@typescript-eslint/...': 'off',
			},
		},
	],
};
