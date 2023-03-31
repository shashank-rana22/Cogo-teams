const getEventControlType = ({ name, options }) => {
	const CONTROL_TYPE_MAPPING = {
		string      : { type: 'text' },
		integer     : { type: 'number' },
		select      : { type: 'select', isClearable: true, options },
		checkbox    : { type: 'checkbox' },
		asyncSelect : {
			type        : 'asyncSelect',
			isClearable : true,
			asyncKey    : 'rule_options',
			params      : { rule_name: name },
		},
		asyncMultiSelect: {
			type        : 'asyncSelect',
			isClearable : true,
			multiple    : true,
			asyncKey    : 'rule_options',
			params      : { rule_name: name },

		},
		locationSelect: {
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			isClearable : true,
		},
	};

	return CONTROL_TYPE_MAPPING;
};

export default getEventControlType;
