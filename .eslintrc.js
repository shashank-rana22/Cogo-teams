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
};
