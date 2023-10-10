const getPlatformCardsData = ({ t = () => {} }) => [
	{
		icon_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/f74a76fc45de3258e88066a982649371.png',
		heading  : t('welcome:for_channel_partners_suppliers_heading'),
		desc     : t('welcome:for_channel_partners_suppliers_desc'),
		login_id : 'testing@cogoport-partners.com',
		password : 'CogoDemo@123',
		href     : {
			label : t('welcome:for_channel_partners_suppliers_label'),
			url   : 'https://partners.stage.cogoport.io',
		},
		eye_button_text: t('welcome:for_channel_partners_suppliers_eye_button_text'),
	},
	{
		icon_url : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/7d3e116621f46e0a8ab259f281c42650.png',
		heading  : t('welcome:for_customers_heading'),
		desc     : t('welcome:for_customers_desc'),
		login_id : 'testing@cogoport-customers.com',
		password : 'CogoDemo@123',
		href     : {
			label : t('welcome:for_customers_label'),
			url   : 'https://app.stage.cogoport.io',
		},
		eye_button_text: t('welcome:for_customers_eye_button_text'),
	},
];
export default getPlatformCardsData;
