/* eslint-disable no-mixed-spaces-and-tabs */
import IcMBookingManagement from '@cogoport/icons-react/dist/es/IcMBookingManagement';
import IcMMoney from '@cogoport/icons-react/dist/es/IcMMoney';
import IcMUsersManageAccounts from '@cogoport/icons-react/dist/es/IcMUsersManageAccounts';

export const PRIMARY_STATS = [
	{
		valueKey    : 'kyc_verification',
		descKey     : 'new_users',
		title       : 'KYC Verified',
		parentKey   : 'new_users_and_kyc_verified',
		description : 'new users',
		icon_bg     : '#f3fafa',
		icon        : <IcMUsersManageAccounts fill="#acdadf" width="18px" height="18px" />,
	},
	{
		valueKey    : 'bookings',
		descKey     : 'rate_enquiry',
		title       : 'Bookings',
		parentKey   : 'booking_and_rate_enquiries',
		description : 'rate inquiries',
		icon_bg     : '#fdfbf6',
		icon        : <IcMBookingManagement fill="#edd789" width="18px" height="18px" />,
	},
	{
		valueKey    : 'revenue',
		descKey     : 'revenue_from_shipments',
		title       : 'Revenue',
		parentKey   : 'invoice_payment_and_revenue',
		description : 'shipments',
		icon_bg     : '#f7faef',
		icon        : <IcMMoney fill="#ABCD62" width="18px" height="18px" />,
	},
];

export const CONVERSATIONS = [
	{
		valueKey : 'total_communications',
		title    : 'Total Communications',
		icon_bg  : '#BDBDBD',
	},
	{
		valueKey : 'system_initiated_communications',
		title    : 'System Initiated Conversations',
		icon_bg  : '#ABCD62',
	},
	{
		valueKey : 'customer_initiated_communications',
		title    : 'Customer Conversations',
		icon_bg  : '#DDEBC0',
	}];

export const INTENT_LEADERBOARD = [
	{
		valueKey    : 'normal_conversations',
		title       : 'Normal conversation',
		description : 'users',
	},
	{
		valueKey    : 'rate_enquiry',
		title       : 'Trade enquiry',
		description : 'users',
	},
	{
		valueKey    : 'bookings',
		title       : 'Shipment booking',
		description : 'users',
	},

];

export const USER_STATUS = [
	{
		valueKey : 'happy_users',
		title    : 'Happy users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/happy_user.svg',
	},
	{
		valueKey : 'nuetral_users',
		title    : 'Neutral users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/neutral_user.svg',
	},
	{
		valueKey : 'angry_users',
		title    : 'Angry users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/angry_user.svg',
	},
];
