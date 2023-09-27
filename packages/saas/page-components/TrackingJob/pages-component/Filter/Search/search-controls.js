const control = ({ setSearchString = () => {}, serialId, searchString }) => {
	console.log('control', serialId, searchString);
	return (
		[

			{
				name        : 'airway_bill_no',
				type        : 'text',
				placeholder : 'Search By Airway/Bill No.',
				span        : 12,
				value       : searchString,
				onchange    : (e) => setSearchString(e),
			},
			{
				name        : 'container_bill_no',
				type        : 'text',
				placeholder : 'Search By Container/Bill No.',
				value       : searchString,
				onchange    : (e) => setSearchString(e),
				span        : 12,

			},
			{
				name        : 'truck_no',
				type        : 'text',
				placeholder : 'Search By Truck No.',
				value       : searchString,
				onchange    : (e) => setSearchString(e),
				span        : 12,

			},
			{
				name        : 'serial_id',
				type        : 'text',
				placeholder : 'Search By Serial Id',
				span        : 12,
				value       : serialId,

			},
		]);
};

export default control;
