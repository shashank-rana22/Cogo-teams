/* eslint-disable no-mixed-spaces-and-tabs */
import IcMBookingManagement from '@cogoport/icons-react/dist/es/IcMBookingManagement';
import IcMMoney from '@cogoport/icons-react/dist/es/IcMMoney';
import IcMUsersManageAccounts from '@cogoport/icons-react/dist/es/IcMUsersManageAccounts';

export const PRIMARY_STATS = [
	{
		valueKey    : 'kyc_verified',
		descKey     : 'new_user',
		title       : 'KYC Verified',
		parentKey   : 'new_users_and_kyc_verified',
		description : 'new users',
		icon_bg     : '#f3fafa',
		icon        : <IcMUsersManageAccounts fill="#acdadf" width="25px" height="25px" />,
	},
	{
		valueKey    : 'bookings',
		descKey     : 'rate_enquiries',
		title       : 'Bookings',
		parentKey   : 'booking_and_rate_enquiries',
		description : 'rate inquiries',
		icon_bg     : '#fdfbf6',
		icon        : <IcMBookingManagement fill="#edd789" width="25px" height="25px" />,
	},
	{
		valueKey    : 'total_revenue',
		descKey     : 'invoice_payments',
		title       : 'Revenue',
		parentKey   : 'invoice_payment_and_revenue',
		description : 'invoice payments',
		icon_bg     : '#f7faef',
		icon        : <IcMMoney fill="#ABCD62" width="25px" height="25px" />,
	},
];

export const CONVERSATIONS = [
	{
		valueKey : 'total_conversation',
		title    : 'Total Communications',
		icon_bg  : '#BDBDBD',
	},
	{
		valueKey : 'system_initiated_conversation',
		title    : 'System Initiated Conversations',
		icon_bg  : '#ABCD62',
	},
	{
		valueKey : 'customer_initiated_conversation',
		title    : 'Customer Initiated Conversations',
		icon_bg  : '#DDEBC0',
	}];

export const INTENT_LEADERBOARD = [
	{
		valueKey    : 'normal_conversation',
		title       : 'Normal conversation',
		description : 'users',
	},
	{
		valueKey    : 'trade_enquiry',
		title       : 'Trade enquiry',
		description : 'users',
	},
	{
		valueKey    : 'shipment_booking',
		title       : 'Shipment booking',
		description : 'users',
	},

];

export const USER_STATUS = [
	{
		valueKey : 'good_rating_count',
		title    : 'Happy users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/happy_user.svg',
	},
	{
		valueKey : 'average_rating_count',
		title    : 'Neutral users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/neutral_user.svg',
	},
	{
		valueKey : 'bad_rating_count',
		title    : 'Angry users',
		src      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/angry_user.svg',
	},
];
