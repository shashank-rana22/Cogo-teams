module.exports = {
	extends        : ['@cogoport/eslint-config/react-typescript'],
	ignorePatterns : ['dist/**/*', '!.stylelintrc.js'],
	root           : true,
	parserOptions  : {
		project         : 'tsconfig.json',
		tsconfigRootDir : __dirname,
		sourceType      : 'module',
	},
};
