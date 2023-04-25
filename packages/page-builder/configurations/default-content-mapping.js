/* eslint-disable max-len */
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { v1 as uuid } from 'uuid';

const getContentMapping = () => {
	const parentId = uuid();

	return {
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

		carousel: {
			children: [{
				id         : 0,
				width      : '100%',
				parentId,
				isRendered : false,
				style      : {
					width          : '100%',
					border         : '1px dashed #9ab7fe',
					margin         : '2px',
					display        : 'flex',
					justifyContent : 'center',
					alignItems     : 'center',
				},
				icon       : <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} />,
				attributes : {
					onClick: 'handleSubmitClick',
				},
			},
			{
				id         : 1,
				width      : '100%',
				parentId,
				isRendered : false,
				style      : {
					width          : '100%',
					border         : '1px dashed #9ab7fe',
					margin         : '2px',
					display        : 'flex',
					justifyContent : 'center',
					alignItems     : 'center',
				},
				icon       : <IcMPlusInCircle style={{ cursor: 'pointer', fill: '#222' }} width={20} height={20} />,
				attributes : {
					onClick: 'handleSubmitClick',
				},
			},
			],
			content     : '',
			parentId,
			redirectUrl : '',
			themeType   : 'primary',
			size        : 'md',
			layouts     : [],
			style       : {},
			type        : 'carousel',
			formData    : {},
			attributes  : {
				onClick: 'handleSubmitClick',
			},
		},

	};
};
export default getContentMapping;
