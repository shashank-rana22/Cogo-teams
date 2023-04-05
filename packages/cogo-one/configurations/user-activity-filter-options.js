function filterOptions() {
	const transactionalFilters = [
		{
			label : 'Enter Serial ID',
			value : 'serial_id',
			type  : 'input',

		},

	];

	const communicationFilters = [
		{
			label : 'Whatsapp',
			value : 'whatsapp',
		},
		{
			label : 'Facebook',
			value : 'facebook',
		},
		{
			label : 'Instagram',
			value : 'instagram',
		},
		{
			label : 'Mail',
			value : 'email',
		},
		{
			label : 'Voice Call',
			value : 'voice_call',
		},
	];
	const summaryFilters = [
		{
			label : 'from',
			value : 'date',
			type  : 'date',
		},
		{
			label : 'to',
			value : 'date',
			type  : 'date',
		},
	];

	const FILTERS_MAPPING = {
		communication : communicationFilters,
		transactional : transactionalFilters,
		summary       : summaryFilters,
	};

	return { FILTERS_MAPPING };
}

export default filterOptions;
