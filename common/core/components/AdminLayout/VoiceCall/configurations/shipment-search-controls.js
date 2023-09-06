const controls = [
	{
		name        : 'serial_id',
		type        : 'select',
		asyncKey    : 'list_user_shipments',
		placeholder : 'Select SID',
	},
	{
		name        : 'organization_id',
		type        : 'select',
		asyncKey    : 'list_organizations_on_call',
		placeholder : 'Select Importer Exporter',
		params      : {
			filters: {
				status: 'active',
			},
		},
	},
];

export default controls;
