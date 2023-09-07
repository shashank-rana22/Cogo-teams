const controls = [
	{
		name        : 'serial_id',
		type        : 'select',
		asyncKey    : 'list_user_shipments',
		placeholder : 'Select SID',
		isClearable : true,
		params      : {
			user_shipments_required: false,
		},
	},
	{
		name        : 'organization_id',
		type        : 'select',
		asyncKey    : 'list_organizations_on_call',
		placeholder : 'Select Importer Exporter',
		isClearable : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	},
];

export default controls;
