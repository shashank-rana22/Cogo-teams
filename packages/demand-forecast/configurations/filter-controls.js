const getControls = () => {
	const filterControls = [
		{
			name  : 'origin',
			label : 'Origin',
			type  : 'select',
		},
		{
			name  : 'destination',
			label : 'Destination',
			type  : 'select',
		},
		{
			name    : 'service_type',
			label   : 'Service Type',
			type    : 'chips',
			options : [
				{
					label : 'FCL',
					value : 'fcl_freight',
				},
				{
					label : 'LCL',
					value : 'lcl_freight',
				},
				{
					label : 'AIR',
					value : 'air_freight',
				},
			],
		},
	];

	return filterControls;
};

export default getControls;
