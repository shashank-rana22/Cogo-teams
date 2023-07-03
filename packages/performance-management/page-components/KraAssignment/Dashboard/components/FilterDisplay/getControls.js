import params from '../../../../../common/getParams';

const getControls = ({ watchTriveId, check }) => {
	const controls = [
		{
			name        : 'employee_ids',
			label       : 'Employee',
			placeholder : 'Select',
			type        : 'asyncSelect',
			asyncKey    : 'list_employees',
			valueKey    : 'id',
			initialCall : true,
			disabled    : check,
			multiple    : true,
			isClearable : true,
			params,
		},

		{
			name        : 'role_ids',
			type        : 'asyncSelect',
			asyncKey    : 'list_roles',
			label       : 'Roles',
			placeholder : 'Select',
			disabled    : check,
			isClearable : true,
			initialCall : true,
			params,
		},

		{
			name        : 'tribe_id',
			type        : 'asyncSelect',
			asyncKey    : 'list_tribes',
			label       : 'Tribes',
			placeholder : 'Select',
			initialCall : true,
			isClearable : true,
			disabled    : check,
			params,
		},

		{
			name        : 'squad_id',
			type        : 'asyncSelect',
			asyncKey    : 'list_squads',
			label       : 'Squads',
			placeholder : 'Select',
			initialCall : true,

			disabled    : !watchTriveId || check,
			isClearable : true,
			params      : {
				filters: {
					...params.filters,
					tribe_id: watchTriveId,
				},
				...params.page_limit,
			},
		},
	];

	return controls;
};

export default getControls;
