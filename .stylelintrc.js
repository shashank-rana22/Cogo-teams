module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
    rules: {
        indentation: 'tab',
        'selector-class-pattern': [
            '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
            {
				message: 'Expected id selector to be kebab-case',
			},
        ],
        'at-rule-empty-line-before': [
			'always',
			{
				except: ['first-nested', 'after-same-name'],
				ignore: ['after-comment'],
				ignoreAtRules: ['else'],
			},
		],
    },
}