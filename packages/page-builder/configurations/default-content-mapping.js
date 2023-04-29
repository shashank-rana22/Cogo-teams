/* eslint-disable max-len */
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { v1 as uuid } from 'uuid';

const getContentMapping = () => {
	const parentId = uuid();

	return {
		text: {
			component: {
				content    : 'Start Typing...',
				type       : 'text',
				style      : {},
				attributes : {
					contenteditable: true,
				},
			},
			// type: 'ROW',
		},

		image: {
			component: {
				content    : '',
				alt        : 'add-img-url',
				style      : {},
				attributes : {},
				type       : 'image',
			},
			// type: 'ROW',
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
			// type: 'ROW',
		},

		html: {
			component: {
				content    : 'Enter Html',
				type       : 'html',
				attributes : {
					onClick: 'handleSubmitClick',
				},
			},
			// type: 'ROW',
		},

		form: {
			component: {
				content    : '',
				style      : {},
				type       : 'form',
				formData   : {},
				attributes : {
					onClick: 'handleSubmitClick',
				},
			},
			// type: 'ROW',
		},

		video: {
			component: {
				content    : '',
				alt        : 'add-img-url',
				style      : {},
				attributes : {},
				type       : 'video',
			},
			// type: 'ROW',
		},

		container: {
			component: {
				content    : '',
				style      : {},
				type       : 'container',
				attributes : {
					onClick: 'handleSubmitClick',
				},
			},
			// type: 'ROW',
		},

		carousel: {
			parentId,
			component: {
				content    : '',
				style      : {},
				type       : 'carousel',
				attributes : {
					onClick: 'handleSubmitClick',
				},
				children: [
					{
						id        : 0,
						width     : '100%',
						parentId,
						// type      : 'COLUMN',
						component : {
							style: {
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
					},
					{
						id        : 1,
						width     : '100%',
						parentId,
						// type      : 'COLUMN',
						component : {
							style: {
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
					},
				],
			},
			// type: 'ROW',
		},

		divider: {
			component: {
				content : '',
				style   : {
					'border-top-color' : '#000000',
					'border-top-width' : '1px',
					'border-top-style' : 'solid',
				},
				type: 'divider',
			},
			// type: 'ROW',
		},

		card: {
			// type      : 'ROW',
			parentId,
			component: {
				type     : 'card',
				style    : { boxShadow: '0 0 8px rgba(98,127,172,.2)' },
				parentId,
				children : [
					{
						id        : 0,
						width     : '100%',
						parentId,
						// type      : 'COLUMN',
						component : {
							content    : 'https://picsum.photos/250/150',
							alt        : 'add-img-url',
							style      : { },
							attributes : {},
							type       : 'image',
						},
					},
					{
						id        : 1,
						width     : '100%',
						parentId,
						// type      : 'COLUMN',
						component : {
							content    : '<h3>Card Title</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan, nisl eget ultricies tincidunt, nunc elit aliquam erat, a ultricies nisl nunc eget nunc. Nullam eget nisl auctor, aliquam ligula eget, aliquam nisl. Nulla facilisi. Nulla facilisi.</p>',
							type       : 'text',
							style      : {},
							attributes : {
								contenteditable: true,
							},
						},
					},
				],
			},
		},

		formSample: {
			// type      : 'ROW',
			parentId,
			component: {
				content  : '',
				style    : {},
				type     : 'formSample',
				name     : 'formSample',
				parentId,
				children : [
					{
						component: {
							content : 'Form Heading',
							type    : 'text',
							style   : {},
						},
						id: 0,
						parentId,
						// type : 'COLUMN',
					},
					{
						id        : 1,
						parentId,
						// type      : 'COLUMN',
						component : {
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
						},
					},
				],
			},
		},

		carouselSample: {
			parentId,
			id        : 1,
			component : {
				style      : {},
				type       : 'carousel',
				attributes : {
					onClick: 'handleSubmitClick',
				},
				children: [
					{
						component: {
							content    : 'https://react-responsive-carousel.js.org/assets/1.jpeg',
							alt        : 'add-img-url',
							style      : {},
							attributes : {},
							type       : 'image',
						},
						id    : 0,
						width : '100%',
						parentId,
					},
					{
						component: {
							content    : 'https://react-responsive-carousel.js.org/assets/2.jpeg',
							alt        : 'add-img-url',
							style      : {},
							attributes : {},
							type       : 'image',
						},
						id    : 1,
						width : '100%',
						parentId,
					},
					{
						component: {
							content    : 'https://react-responsive-carousel.js.org/assets/3.jpeg',
							alt        : 'add-img-url',
							style      : {},
							attributes : {},
							type       : 'image',
						},
						id    : 2,
						width : '100%',
						parentId,
					},
					{
						component: {
							content    : 'https://react-responsive-carousel.js.org/assets/4.jpeg',
							alt        : 'add-img-url',
							style      : {},
							attributes : {},
							type       : 'image',
						},
						id    : 3,
						width : '100%',
						parentId,
					},
					{
						component: {
							content    : 'http://react-responsive-carousel.js.org/assets/5.jpeg',
							alt        : 'add-img-url',
							style      : {},
							attributes : {},
							type       : 'image',
						},
						id    : 4,
						width : '100%',
						parentId,
					},
				],
			},
			type: 'carousel',
		},

		videoSample: {
			component: {
				content    : 'https://partners.cogoport.com',
				alt        : 'add-img-url',
				style      : {},
				attributes : {},
				type       : 'video',
			},
		},
	};
};
export default getContentMapping;
