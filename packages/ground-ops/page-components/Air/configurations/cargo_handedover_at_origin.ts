export const CargoHandedOverAtOrigin = {
	fields: [
		{
			key   : 'serial_id',
			label : 'SID',
			span  : 0.8,
		},
		{
			key   : 'customer_name',
			label : 'Customer Name',
			span  : 2,
			func  : 'startCase',
		},
		{
			key   : 'ops_name',
			label : 'Ops Name',
			span  : 1.8,
			func  : 'startCase',
		},
		{
			key   : 'service',
			label : 'Service',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'origin',
			label : 'Origin',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'destination',
			label : 'Destination',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'estimated_departure',
			label : 'ETD',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'carrier',
			label : 'Carrier',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'last_mile_stone',
			label : 'Last Mile Stone',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'completed_on',
			label : 'Completed On',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'current_tasks',
			label : 'Current Tasks',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'due_on',
			label : 'Due On',
			span  : 1.5,
			func  : 'startCase',
		},
	],
};
