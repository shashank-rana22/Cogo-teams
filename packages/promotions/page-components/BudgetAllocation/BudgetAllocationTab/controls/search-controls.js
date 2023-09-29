const controls = (selectedDetails) => [
	{
		name           : 'agent_id',
		placeholder    : 'Select',
		type           : 'async_select',
		asyncKey       : 'partner_users_ids',
		span           : 12,
		labelKey       : 'name',
		valueKey       : 'id',
		isClearable    : true,
		defaultOptions : true,
		params         : { filters: { role_ids: [selectedDetails?.role_id] } },
	},
];
export default controls;
