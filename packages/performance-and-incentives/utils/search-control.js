const getSearchControls = (props) => {
	const { debounceQuery, name = 'name', placeholder = 'Name' } = props;

	const searchControls = [
		{
			name,
			placeholder,
			type     : 'text',
			onChange : (val) => debounceQuery(val),
		},
	];

	return searchControls;
};

export default getSearchControls;
