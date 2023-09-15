const getSearchControls = (props) => {
	const { debounceQuery, name = 'pan_name', placeholder = 'Pan/Name' } = props;

	const searchControls = [
		{
			name,
			placeholder,
			type     : 'text',
			onChange : (val) => {
				debounceQuery(val);
			},
		},
	];

	return searchControls;
};

export default getSearchControls;
