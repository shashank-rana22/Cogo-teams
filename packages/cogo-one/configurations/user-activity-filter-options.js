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
			label : 'Telegram',
			value : 'telegram',
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

	const FILTERS_MAPPING = {
		communication : communicationFilters,
		transactional : transactionalFilters,
	};

	return { FILTERS_MAPPING };
}

export default filterOptions;
