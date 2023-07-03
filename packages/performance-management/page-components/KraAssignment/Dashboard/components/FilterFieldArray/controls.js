import params from '../../../../../common/getParams';

const getControls = (watchTribeId) => {
	const controlItems = {
		name     : 'single_item',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'role_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_roles',
				label       : 'Roles',
				placeholder : 'Select',
				initialCall : true,
				isClearable : true,
				params,
			},
			{
				name        : 'tribe_id',
				type        : 'asyncSelect',
				asyncKey    : 'list_tribes',
				label       : 'Tribes',
				placeholder : 'Select',
				isClearable : true,
				initialCall : true,
				params,
			},

			{
				name        : 'squad_id',
				type        : 'asyncSelect',
				asyncKey    : 'list_squads',
				label       : 'Squads',
				placeholder : 'Select',
				initialCall : true,
				disabled    : !watchTribeId,
				isClearable : true,
				params      : {
					...params,
					filters: {
						...params.filters,
						tribe_id: watchTribeId,
					},
				},
			},
		],
	};
	return controlItems;
};

export default getControls;
