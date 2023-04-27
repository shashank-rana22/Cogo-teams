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
					border         : '1px dashed #9ab7fe',
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
					border         : '1px dashed #9ab7fe',
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

		divider: {
			content     : '',
			redirectUrl : '',
			themeType   : 'primary',
			size        : 'md',
			layouts     : [],
			style       : {
				'border-top-color' : '#000000',
				'border-top-width' : '1px',
				'border-top-style' : 'solid',
			},
			type       : 'divider',
			formData   : {},
			attributes : {
				onClick: 'handleSubmitClick',
			},
		},

		card: {
			type     : 'card',
			parentId,
			style    : { boxShadow: '0 0 8px rgba(98,127,172,.2)' },
			children : [
				{
					id         : 0,
					content    : 'https://picsum.photos/250/150',
					alt        : 'add-img-url',
					style      : { },
					attributes : {},
					type       : 'image',
					parentId,
				},
				{
					id         : 1,
					content    : '<h3>Card Title</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, nisl eget ultricies tincidunt, nunc elit aliquam erat, a ultricies nisl nunc eget nunc. Nullam eget nisl auctor, aliquam ligula eget, aliquam nisl. Nulla facilisi. Nulla facilisi.</p>',
					type       : 'text',
					style      : {},
					parentId,
					attributes : {
						contenteditable: true,
					},
				},
			],
		},

		formSample: {
			content  : '',
			style    : {},
			type     : 'formSample',
			name     : 'formSample',
			parentId,
			children : [
				{
					content : 'Form Heading',
					type    : 'text',
					style   : {},
					id      : 0,
					parentId,
				},
				{
					content  : '',
					style    : {},
					type     : 'form',
					formData : {
						heading    : 'Form Heading',
						api_url    : 'dummy_url',
						buttonText : 'Button Name',
						controls   : [
							{
								label        : 'Name',
								type         : 'text',
								placeholder  : 'Enter Name',
								width        : '100%',
								is_mandetory : 'no',
								name         : 'name',
								style        : {
									flexBasis: '100%',
								},
								rules: {},
							},
							{
								label                 : 'Email',
								type                  : 'text',
								placeholder           : 'Enter Email',
								width                 : '100%',
								options_type          : '',
								manual_options        : '',
								dynamic_data_endpoint : '',
								is_mandetory          : 'no',
								name                  : 'email',
								style                 : {
									flexBasis: '100%',
								},
								rules: {},
							},
							{
								label                 : 'Mobile Number',
								type                  : 'mobileNumber',
								placeholder           : 'Enter Mobile Number',
								width                 : '100%',
								options_type          : '',
								manual_options        : '',
								dynamic_data_endpoint : '',
								is_mandetory          : 'no',
								name                  : 'mobile_number',
								style                 : {
									flexBasis: '100%',
								},
								rules: {},
							},
						],
					},
					attributes: {
						onClick: 'handleSubmitClick',
					},
					id: 1,
					parentId,
				},
			],
		},
	};
};
export default getContentMapping;
