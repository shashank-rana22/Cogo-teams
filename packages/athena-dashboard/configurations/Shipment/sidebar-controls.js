const getControls = ({ t = () => {} }) => [
	{
		name        : 'origin_country',
		placeholder : t('athenaDashboard:origin_country_placeholder'),
		label       : t('athenaDashboard:origin_country_label'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},

	},
	{
		name        : 'destination_country',
		placeholder : t('athenaDashboard:destination_country_placeholder'),
		label       : t('athenaDashboard:destination_country_label'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['country'],
			},
		},

	},
	{
		name        : 'origin_port',
		placeholder : t('athenaDashboard:origin_port_placeholder'),
		label       : t('athenaDashboard:origin_port_label'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['seaport', 'airport'],
			},
		},

	},
	{
		name        : 'destination_port',
		placeholder : t('athenaDashboard:destination_port_placeholder'),
		label       : t('athenaDashboard:destination_port_label'),
		type        : 'asyncSelect',
		asyncKey    : 'list_locations',
		valueKey    : 'name',
		initialCall : false,
		multiple    : true,
		params      : {
			filters: {
				type: ['seaport', 'airport'],
			},
		},

	},
];
export default getControls;
