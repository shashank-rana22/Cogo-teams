import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const entityType = Object.entries(GLOBAL_CONSTANTS.cogoport_entities).map(([key]) => (
	{
		label : key,
		value : key,
		name  : key,
	}));
