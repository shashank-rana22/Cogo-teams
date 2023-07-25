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
				params      : {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},
			{
				name        : 'tribe_id',
				type        : 'asyncSelect',
				asyncKey    : 'list_tribes',
				label       : 'Tribes',
				placeholder : 'Select',
				isClearable : true,
				initialCall : true,
				params      : {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
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
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
						tribe_id             : watchTribeId,
					},
					page_limit: 100,
				},
			},
		],
	};
	return controlItems;
};

export default getControls;
