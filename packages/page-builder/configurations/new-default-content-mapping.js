/* eslint-disable max-len */
const CONTENT_MAPPING = {
	text: {
		component: {
			type       : 'text',
			content    : 'Start Typing...',
			style      : {},
			attributes : {
				contenteditable: true,
			},
		},
		layouts: [],
	},

	image: {
		component: {
			content    : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
			alt        : 'add-img-url',
			type       : 'image',
			style      : {},
			attributes : {},
		},
		layouts: [],
	},

	button: {
		component: {
			content     : 'Click Me!',
			redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
			themeType   : 'primary',
			size        : 'md',
			style       : {},
			type        : 'button',
			attributes  : {
				onClick: 'handleSubmitClick',
			},
		},
		layouts: [],

	},

	html: {
		component: {
			content     : 'Enter Html',
			redirectUrl : '',
			themeType   : 'primary',
			size        : 'md',
			style       : {},
			type        : 'html',
			attributes  : {
				onClick: 'handleSubmitClick',
			},
		},
		layouts: [],
	},

	form: {
		component: {
			content     : '',
			redirectUrl : '',
			themeType   : 'primary',
			size        : 'md',
			style       : {},
			type        : 'form',
			formData    : {},
			attributes  : {
				onClick: 'handleSubmitClick',
			},
		},
		layouts: [],
	},
};

export default CONTENT_MAPPING;
