function filterOptions() {
	const transactionalFilters = [
		{
			label : 'Booking',
			value : 'booking',
		},
		{
			label : 'Vessel',
			value : 'vessel',
		},
		{
			label : 'Booking note',
			value : 'booking_note',
		},
	];

	const platformFilters = [
		{
			label : 'Checkout',
			value : 'checkout',
		},
		{
			label : 'Login',
			value : 'login',
		},
		{
			label : 'Search',
			value : 'search',
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
			value : 'mail',
		},
	];

	const FILTERS_MAPPING = {
		platform      : platformFilters,
		communication : communicationFilters,
		transactional : transactionalFilters,
	};

	return { FILTERS_MAPPING };
}

export default filterOptions;
