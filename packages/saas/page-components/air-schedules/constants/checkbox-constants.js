const getConstants = () => {
	const restOptions = [
		{
			label : 'Arrival',
			value : '2',
		},
	];

	const stopsOptions = [
		{
			label : 'Direct',
			value : '0',
		},
		{
			label : 'Transshipment',
			value : '1',
		},
	];

	return { restOptions, stopsOptions };
};

export default getConstants;
