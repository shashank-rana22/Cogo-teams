const controls = () => ({
	basic: [
		{
			name        : 'arrival_date',
			type        : 'select',
			placeholder : 'Arrival Date',
			span        : 4,
			size        : 'md',
		},
		{
			name           : 'departure_date',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			placeholder    : 'Arrival Date',
			span           : 4,
			size           : 'md',
		},

	],
	port: [
		{
			name           : 'port_name',
			placeholder    : 'Port Name',
			span           : 4,
			size           : 'md',
			multiple       : false,
			type           : 'location-select',
			optionsListKey : 'locations',
		},
	],

}
);

export default controls;
