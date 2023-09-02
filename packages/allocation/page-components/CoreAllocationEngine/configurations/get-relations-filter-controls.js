const controls = ({ t = () => {} }) => ([
	{
		name    : 'relation_type',
		type    : 'chips',
		label   : t('allocation:relation_type_label'),
		options : [
			{ value: 'keep', label: t('allocation:keep_label') },
			{ value: 'remove', label: t('allocation:remove_label') },
		],
	},
	{
		name    : 'stakeholder_type',
		type    : 'chips',
		label   : t('allocation:stakeholder_type_label'),
		options : [
			{ value: 'sales_agent', label: t('allocation:sales_agent_label') },
			{ value: 'credit_controller', label: t('allocation:credit_controller_label') },
			{ value: 'ckam', label: t('allocation:ckam_label') },
		],
	},
]);

export default controls;
