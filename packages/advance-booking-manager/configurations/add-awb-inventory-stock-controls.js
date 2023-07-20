const controls = (setFilter) => [
	{
		name        : 'airport_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		placeholder : 'Origin Airport',
		span        : 2,
		isClearable : true,
		onChange    : (obj) => setFilter((prev) => ({ ...prev, origin: obj })),
		params      : {
			filters: {
				type: ['airport'],
			},
		},
	},
	{
		name        : 'airline_id',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		placeholder : 'Airline',
		isClearable : true,
		onChange    : (obj) => setFilter((prev) => ({ ...prev, airline: obj })),
		span        : 2,
	},
	{
		name        : 'procured_by_id',
		type        : 'async-select',
		asyncKey    : 'partner_users',
		placeholder : 'Procured by agent',
		valueKey    : 'user_id',
		isClearable : true,
		onChange    : (obj) => setFilter((prev) => ({ ...prev, procured: obj })),
		span        : 2,
	},
];
export default controls;
