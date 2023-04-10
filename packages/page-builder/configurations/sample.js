const template = {
	components: [
		{
			type       : 'container',
			properties : {
				styles: {
					backgroundColor : '#f2f2f2',
					padding         : '20px',
					border          : '1px solid #ddd',
					borderRadius    : '5px',
				},
				attributes: {},
			},
			children: [
				{
					type       : 'container',
					properties : {
						styles: {
							backgroundColor : '#f2f2f2',
							padding         : '20px',
							border          : '1px solid #ddd',
							borderRadius    : '5px',
						},
						attributes: {},
					},
					children: [
						{
							type       : 'text',
							properties : {
								content : 'Welcome to page builder!',
								styles  : {
									fontSize       : '24px',
									color          : '#333',
									display        : 'flex',
									justifyContent : 'center',
								},
								attributes: {},
							},

						},
						{
							type       : 'image',
							properties : {
								// eslint-disable-next-line max-len
								content : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
								style   : {
									width  : '100%',
									height : '300px',
								},
								attributes: {},
							},
						},
						{
							type       : 'button',
							properties : {
								content     : 'Click Me!',
								redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
								styles      : {
									backgroundColor : '#ee3425',
									color           : '#fff',
									padding         : '10px',
									border          : 'none',
									borderRadius    : '5px',
									display         : 'flex',
									justifyContent  : 'center',
									cursor          : 'pointer',
								},
								attributes: {
									onClick: 'handleSubmitClick',
								},
							},

						},
					],

				},
				{
					type       : 'text',
					properties : {
						content : 'Welcome to page builder!',
						styles  : {
							fontSize       : '24px',
							color          : '#333',
							display        : 'flex',
							justifyContent : 'center',
						},
						attributes: {},
					},

				},
				{
					type       : 'image',
					properties : {
						// eslint-disable-next-line max-len
						content : 'https://www.cogoport.com/_next/image/?url=https%3A%2F%2Fcdn.cogoport.io%2Fcms-prod%2Fcogo_public%2Fvault%2Foriginal%2Fchannel-partner-header-2.png&w=1920&q=75',
						style   : {
							width  : '100%',
							height : '300px',
						},
						attributes: {},
					},
				},
				{
					type       : 'button',
					properties : {
						content     : 'Click Me!',
						redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
						styles      : {
							backgroundColor : '#ee3425',
							color           : '#fff',
							padding         : '10px',
							border          : 'none',
							borderRadius    : '5px',
							display         : 'flex',
							justifyContent  : 'center',
							cursor          : 'pointer',
						},
						attributes: {
							onClick: 'handleSubmitClick',
						},
					},

				},
			],

		},
		{
			type       : 'button',
			properties : {
				content     : 'Click Me!',
				redirectUrl : 'https://www.cogoport.com/en-IN/company/careers/',
				styles      : {
					backgroundColor : '#ee3425',
					color           : '#fff',
					padding         : '10px',
					border          : 'none',
					borderRadius    : '5px',
					display         : 'flex',
					justifyContent  : 'center',
					cursor          : 'pointer',
				},
				attributes: {
					onClick: 'handleSubmitClick',
				},
			},

		},
		{
			type       : 'text',
			properties : {
				content : 'Welcome to page builder!',
				styles  : {
					fontSize       : '24px',
					color          : '#333',
					display        : 'flex',
					justifyContent : 'center',
				},
				attributes: {},
			},

		},
	],
};

export default template;
