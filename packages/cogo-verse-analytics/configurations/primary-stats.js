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

export const CONVERSATIONS = [
	{
		value   : 240,
		title   : 'Total Communications',
		icon_bg : '#BDBDBD',
	},
	{
		value   : 220,
		title   : 'System Initiated conversations',
		icon_bg : '#ABCD62',
	},
	{
		value   : 20,
		title   : 'Customer Initiated conversations',
		icon_bg : '#DDEBC0',
	},
];
