export const getOptions = (view_type = '') => {
	const options = [
		{ label: 'Overall', value: 'overall' },
		{ label: 'Account Type', value: 'account_type' },
	];

	switch (view_type) {
		case 'outstanding':
			options.push(
				{ label: 'Ageing Bucket', value: 'ageing_bucket' },
				{ label: 'Service', value: 'service' },
			);
			break;
		case 'invoice':
			options.push({ label: 'Service', value: 'service' });
			break;
		default:
			break;
	}

	return options;
};
