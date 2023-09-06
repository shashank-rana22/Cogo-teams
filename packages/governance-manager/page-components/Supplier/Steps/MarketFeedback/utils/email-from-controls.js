export	const controls = ({ t }) => [
	{
		type     : 'fieldArray',
		name     : 'emails',
		label    : t('supplier_page_market_feedback_email_controls_email_label'),
		controls : [
			{
				controlType : 'select',
				name        : 'user_role',
				label       : t('supplier_page_market_feedback_email_controls_role_label'),
				rules       : { required: t('supplier_page_market_feedback_email_controls_role_required') },
				placeholder : t('supplier_page_market_feedback_email_controls_role_place_holder'),
				options     : [
					{
						label : t('supplier_page_market_feedback_email_controls_role_option_industry_expert'),
						value : 'industry_expert',
					},
					{
						label : t('supplier_page_market_feedback_email_controls_role_option_cogoport_employee'),
						value : 'cogoport_employee',
					},
					{
						label : t('supplier_page_market_feedback_email_controls_role_option_customer'),
						value : 'customer',
					},
					{
						label : t('supplier_page_market_feedback_email_controls_role_option_others'),
						value : 'others',
					},
				],
			},
			{
				controlType : 'input',
				name        : 'user_name',
				label       : t('supplier_page_market_feedback_email_controls_user_name_label'),
				placeholder : t('supplier_page_market_feedback_email_controls_user_name_label'),
				rules       : { required: t('supplier_page_market_feedback_email_controls_user_name_required') },
			},
			{
				label       : t('supplier_page_market_feedback_email_controls_email_label'),
				controlType : 'input',
				placeholder : t('supplier_page_market_feedback_email_controls_email_place_holder'),
				name        : 'user_email',
				rules       : {
					required : t('supplier_page_market_feedback_email_controls_email_required'),
					pattern  : {
						value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
						message : t('supplier_page_market_feedback_email_controls_email_required_message'),
					},
				},
			},
		],
	},

];
export const defaultValues = {
	emails: [{
		user_name  : '',
		user_email : '',
		user_role  : '',
	},
	],
};
