import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const GROUP_TYPE_SELECTIONS = [
	{
		icon  : GLOBAL_CONSTANTS.image_url.private,
		name  : 'Private',
		label : 'People will need permission to join',
		value : 'private',
	},
	{
		icon  : GLOBAL_CONSTANTS.image_url.universe,
		name  : 'Public',
		label : 'Anyone in your org can join. No permission needed.',
		value : 'public',
	},
];
