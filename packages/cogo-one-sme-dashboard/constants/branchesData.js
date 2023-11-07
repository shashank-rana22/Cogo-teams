/* eslint-disable custom-eslint/email-check */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const BRANCHES = [
	{
		name       : 'Gurgaon',
		id         : GLOBAL_CONSTANTS?.office_location_ids?.gurgaon,
		country_id : GLOBAL_CONSTANTS?.country_ids?.IN,
	},
	{
		name       : 'Mumbai',
		id         : GLOBAL_CONSTANTS?.office_location_ids?.mumbai,
		country_id : GLOBAL_CONSTANTS?.country_ids?.IN,
	},
];

export const BRANCH_OWNERS = {
	[GLOBAL_CONSTANTS?.office_location_ids?.mumbai]: [
		{
			id    : GLOBAL_CONSTANTS?.uuid?.harprem_mishra_user_id,
			name  : 'Harprem  Mann',
			email : 'harprem.mann@cogoport.com',
		},

	],
	[GLOBAL_CONSTANTS?.office_location_ids?.gurgaon]: [
		{
			id    : GLOBAL_CONSTANTS?.uuid?.amitabh_user_id,
			name  : 'Amitabh Shankar',
			email : 'amitabh.shankar@cogoport.com',
		},
		{
			id    : GLOBAL_CONSTANTS?.uuid?.kranti_mishra_user_id,
			name  : 'Kranti Mishra',
			email : 'kranti.mishra@cogoport.com',
		},
	],
};
