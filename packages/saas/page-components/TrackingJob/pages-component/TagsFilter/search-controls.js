const control = ({ setSearchString = () => {} }) => [

	{
		name        : 'airway_bill_no',
		type        : 'text',
		placeholder : 'Search By Airway/Bill No.',
		span        : 12,
		onchange    : (e) => setSearchString(e),
	},
	{
		name        : 'container_bill_no',
		type        : 'text',
		placeholder : 'Search By Container/Bill No.',
		onchange    : (e) => setSearchString(e),
		span        : 12,

	},
	{
		name        : 'truck_no',
		type        : 'text',
		placeholder : 'Search By Truck No.',
		onchange    : (e) => setSearchString(e),
		span        : 12,

	},
	{
		name        : 'serial_id',
		type        : 'text',
		placeholder : 'Search By Serial Id',
		span        : 12,

	},
];

export default control;
