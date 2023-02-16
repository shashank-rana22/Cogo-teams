import IcMBookingManagement from '@cogoport/icons-react/dist/es/IcMBookingManagement';
import IcMMoney from '@cogoport/icons-react/dist/es/IcMMoney';
import IcMUsersManageAccounts from '@cogoport/icons-react/dist/es/IcMUsersManageAccounts';

export const PRIMARY_STATS = [
	{
		value       : 10,
		title       : 'KYC Verified',
		description : 'new users',
		users       : 200,
		icon_bg     : '#f3fafa',
		icon        : <IcMUsersManageAccounts fill="#acdadf" width="25px" height="25px" />,
	},
	{
		value       : 10,
		title       : 'Bookings',
		description : 'rate inquiries',
		users       : 200,
		icon_bg     : '#fdfbf6',
		icon        : <IcMBookingManagement fill="#edd789" width="25px" height="25px" />,
	},
	{
		value       : '1.5L',
		title       : 'Revenue',
		description : 'invoice payments',
		users       : 200,
		icon_bg     : '#f7faef',
		icon        : <IcMMoney fill="#ABCD62" width="25px" height="25px" />,
	},
];

export const INTENT_LEADERBOARD = [
	{
		value       : 240000,
		title       : 'Normal conversation',
		description : 'users',
	},
	{
		value       : 40000,
		title       : 'Trade enquiry',
		description : 'users',
	},
	{
		value       : 4000,
		title       : 'Shipment booking',
		description : 'users',
	},
	{
		value       : 4000,
		title       : 'Shipment booking',
		description : 'users',
	},
];

export const USER_STATUS = [
	{
		value : 20,
		title : 'Happy users',
		src   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/happy_user.svg',
	},
	{
		value : 20,
		title : 'Neutral users',
		src   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/neutral_user.svg',
	},
	{
		value : 20,
		title : 'Angry users',
		src   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/angry_user.svg',
	},
];
