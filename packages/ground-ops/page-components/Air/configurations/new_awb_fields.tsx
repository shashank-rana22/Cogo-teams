export const NewAWBFields = {
	fields: [
		{
			key    : 'serialId',
			label  : 'SID',
			span   : 0.8,
			render : (item) => (
				<div className="card-list-item-value">
					{item.state}
				</div>
			),
		},
		{
			key    : 'awbNumber',
			label  : 'AWB',
			span   : 1.5,
			render : (item) => (
				<div className="card-list-item-value">
					{item.state}
				</div>
			),
		},
		{
			key   : 'customer_name',
			label : 'Customer Name',
			span  : 2,
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
			key   : 'airline',
			label : 'Carrier',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'state',
			label : 'Last Mile Stone',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'task',
			label : 'Current Tasks',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'deadline',
			label : 'Due On',
			span  : 1.5,
			func  : 'startCase',
		},
		{
			key   : 'generateDoc',
			label : 'Generate Document',
			span  : 1.5,
			func  : 'handleGenerate',
		},

	],
};
