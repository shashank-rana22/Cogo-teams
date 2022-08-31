module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
    rules: {
        indentation: 'tab',
        'selector-class-pattern': [
            '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
            {
				message: 'Expected id selector to be kebab-case',
			},
        ],
    },
}