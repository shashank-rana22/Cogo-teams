const controls = [
	{
		name        : 'rejection_reasons',
		type        : 'asyncSelect',
		label       : 'Reason Type',
		placeholder : 'Search Reason...',
		asyncKey    : 'allocation_rejection_type',
		multiple    : true,
		isClearable : true,
		rules       : { required: 'reason type is required' },
	},
];

export default controls;
