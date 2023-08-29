const getUpdateDetailsControls = ({ stakeholderDetail = {}, t = () => {} }) => {
	const controls = [
		{
			name        : 'stakeholder_id',
			label       : t('allocation:stakeholder_id_label'),
			placeholder : t('allocation:stakeholder_placeholder'),
			type        : 'asyncSelect',
			value       : stakeholderDetail.stakeholder_id || '',
			initialCall : true,
			asyncKey    : 'partner_users',
			valueKey    : 'user_id',
			rules       : {
				required: true,
			},
			params: {
				filters: {
					partner_entity_types : ['cogoport'],
					role_ids             : stakeholderDetail.role_ids,
				},
			},
		},
	];

	return controls;
};

export default getUpdateDetailsControls;
