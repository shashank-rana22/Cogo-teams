const getSearchControls = (props) => {
	const { debounceQuery } = props;

	const searchControls = [
		{
			name        : 'pan_name',
			placeholder : 'Pan/Name',
			type        : 'text',
			onChange    : (val) => {
				debounceQuery(val);
			},
		},
	];

	return searchControls;
};

export default getSearchControls;
