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
		content    : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
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
};

export default CONTENT_MAPPING;
