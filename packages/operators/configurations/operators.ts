export const OPERATORS = {
	fields: [
		{
			key   : 'logo',
			label : 'Logo',
			span  : 2,
			func  : 'handleLogo',
		},
		{
			key   : 'short_name',
			label : 'Name',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'operator_type',
			label : 'Operator Type',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'iata_code',
			label : 'IATA Code',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'airway_bill_prefix',
			label : 'Airway Bill Prefix',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1.5,
			func  : 'handleStatus',
		},
		{
			key   : 'edit',
			label : '',
			span  : 1,
			func  : 'handleEdit',
		},
	],
};
