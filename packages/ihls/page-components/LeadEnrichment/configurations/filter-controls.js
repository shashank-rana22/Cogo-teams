const controls = [
	{
		name        : 'objective_id',
		placeholder : 'Objective',
		type        : 'asyncSelect',
		asyncKey    : 'allocation_objectives',
		multiple    : true,
		valueKey    : 'id',
		params      : {
			page       : 1,
			page_limit : 10,
		},
		width       : '19%',
		initialCall : true,
	},
	{
		name        : 'services',
		placeholder : 'Imp/Exp',
		type        : 'select',
		width       : '15%',
		options     : [
			{ label: 'Importer', value: 'importer' },
			{ label: 'Exporter', value: 'exporter' },
			{ label: 'Both', value: 'both' },
			{ label: 'None', value: 'null' },
		],
	},
	{
		name        : 'origin_country_port',
		placeholder : 'Origin country / Port',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'id',
		params      : {
			page_limit : 20,
			filters    : {
				status : 'active',
				type   : ['seaport', 'country'],
			},
			includes: {
				city                    : true,
				country                 : true,
				default_params_required : true,
			},
		},
		initialCall : false,
		width       : '28%',
	},
	{
		name        : 'destination_country_port',
		placeholder : 'Destination country / Port',
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'id',
		params      : {
			page_limit : 20,
			filters    : {
				status : 'active',
				type   : ['seaport', 'country'],
			},
			includes: {
				city                    : true,
				country                 : true,
				default_params_required : true,
			},
		},
		width: '34%',
	},
];
export default controls;
