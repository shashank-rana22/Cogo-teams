const getControl = ({ CNData = {} }) => {
	const optionsForCNNumber = (CNData?.list || [])
		.filter((item) => item?.status === 'approved')
		.map((item) => ({
			label : item?.cn_number,
			value : item?.id,
		}));

	const controls = [
		{
			name        : 'cn_number',
			placeholder : 'Select CN',
			type        : 'select',
			options     : optionsForCNNumber,
			isClearable : true,
			span        : 1,
			rules       : {
				required : 'required',
				min      : 1,
			},
		},
	];

	return controls;
};

export default getControl;
