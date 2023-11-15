export default {
	control: {
		backgroundColor : '#fff',
		marginBottom    : 16,
	},

	'&multiLine': {
		control: {
			minHeight    : 120,
			marginBottom : 16,
		},
		highlighter: {
			padding : 9,
			border  : '1px solid transparent',
		},
		input: {
			padding : 9,
			border  : '1px solid silver',
		},
	},

	'&singleLine': {
		display      : 'inline-block',
		width        : 180,
		marginBottom : 16,
		highlighter  : {
			padding : 1,
			border  : '2px inset transparent',
		},
		input: {
			padding: 1,
		},
	},

	suggestions: {
		list: {
			backgroundColor : 'white',
			border          : '1px solid rgba(0,0,0,0.15)',
			fontSize        : 14,
			borderRadius    : 4,
		},
		item: {
			padding      : '5px 15px',
			borderBottom : '1px solid rgba(0,0,0,0.15)',
			'&focused'   : {
				backgroundColor: '#f8f5ec',
			},
		},
	},
};
