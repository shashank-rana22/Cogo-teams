const getControls = (WATCH_VALUES = '') => {
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
				disabled    : !WATCH_VALUES.tribe_id,
				isClearable : true,
				params      : {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
						tribe_id             : WATCH_VALUES.tribe_id,
					},
					page_limit: 100,
				},
			},
			// {
			// 	name        : 'chapter_id',
			// 	type        : 'asyncSelect',
			// 	asyncKey    : 'list_chapters',
			// 	label       : 'Chapters',
			// 	disabled    : !WATCH_VALUES.squad_id,
			// 	placeholder : 'Select',
			// 	isClearable : true,
			// 	params      : {
			// 		filters: {
			// 			status               : 'active',
			// 			partner_entity_types : ['cogoport'],
			// 			squad_id             : WATCH_VALUES.squad_id,

			// 		},
			// 		page_limit: 100,
			// 	},
			// },
			// {
			// 	name        : 'sub_chapter_id',
			// 	type        : 'asyncSelect',
			// 	asyncKey    : 'list_sub_chapters',
			// 	label       : 'Sub chapter',
			// 	disabled    : !WATCH_VALUES.chapter_id,
			// 	placeholder : 'Select',
			// 	isClearable : true,
			// 	params      : {
			// 		filters: {
			// 			status               : 'active',
			// 			partner_entity_types : ['cogoport'],
			// 			chapter_id           : WATCH_VALUES.chapter_id,
			// 		},
			// 		page_limit: 100,
			// 	},
			// },
		],
	};
	return controlItems;
};

export default getControls;
