/* eslint-disable max-len */
const CONTENT_MAPPING = {
	text: {
		content    : 'Start Typing...',
		layouts    : [],
		type       : 'text',
		style      : {},
		attributes : {
			contenteditable: true,
		},
	},

	image: {
		content    : '',
		alt        : 'add-img-url',
		layouts    : [],
		style      : {},
		attributes : {},
		type       : 'image',
	},

	button: {
		content     : 'Click Me!',
		redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
		themeType   : 'primary',
		size        : 'md',
		layouts     : [],
		style       : {},
		type        : 'button',
		attributes  : {
			onClick: 'handleSubmitClick',
		},
	},

	html: {
		content     : 'Enter Html',
		redirectUrl : '',
		themeType   : 'primary',
		size        : 'md',
		layouts     : [],
		style       : {},
		type        : 'html',
		attributes  : {
			onClick: 'handleSubmitClick',
		},
	},

	form: {
		content     : '',
		redirectUrl : '',
		themeType   : 'primary',
		size        : 'md',
		layouts     : [],
		style       : {},
		type        : 'form',
		formData    : {},
		attributes  : {
			onClick: 'handleSubmitClick',
		},
	},

	video: {
		content    : '',
		alt        : 'add-img-url',
		layouts    : [],
		style      : {},
		attributes : {},
		type       : 'video',
	},

	container: {
		content     : '',
		redirectUrl : '',
		themeType   : 'primary',
		size        : 'md',
		layouts     : [],
		style       : {},
		type        : 'container',
		formData    : {},
		attributes  : {
			onClick: 'handleSubmitClick',
		},
	},

};

export default CONTENT_MAPPING;
