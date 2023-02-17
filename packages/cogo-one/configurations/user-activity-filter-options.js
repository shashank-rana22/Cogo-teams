function filterOptions() {
	const transactionalFilters = [
		{
			label : 'Enter Serial ID',
			value : 'serial_id',
			type  : 'input',
		},
		// {
		// 	label : 'Booking',
		// 	value : 'upload_bn_task',
		// },
		// {
		// 	label : 'Vessel',
		// 	value : 'containers_gated_in',
		// },
		// {
		// 	label : 'Booking note',
		// 	value : 'booking_note_uploaded',
		// },
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
			value : 'mail',
		},
	];

	const FILTERS_MAPPING = {
		communication : communicationFilters,
		transactional : transactionalFilters,
	};

	return { FILTERS_MAPPING };
}

export default filterOptions;
