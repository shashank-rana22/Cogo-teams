import { IcMSearchdark } from '@cogoport/icons-react';

const IconMapping = [
	{
		name    : 'profile',
		content : 'Profile',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/profile.svg"
			alt="profile"
			style={{ width: '18px', heigh: '18px' }}
		/>,
	},
	{
		name    : 'organization',
		content : 'Organisation Details',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/organ-svg.svg"
			alt="organization"
			style={{ width: '20px', heigh: '20px' }}
		/>,
	},
	{
		name    : 'user_activity',
		content : 'User Activity',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/user actrivity.svg"
			alt="activities"
		/>,
	},
	{
		name    : 'reminder',
		content : 'Reminder',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/alarm-timer.svg"
			alt="reminder"
		/>,
	},
	{
		name    : 'notes',
		content : 'Notes',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/note.svg"
			alt="notes"
		/>,
	},
	{
		name    : 'quick_actions',
		content : 'Quick Actions',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/actions.svg"
			alt="actions"
		/>,
	},
	{
		name    : 'spot_search',
		content : 'Spot Search',
		icon    : <IcMSearchdark width={16} height={16} />,
	},
	{
		name    : 'customer_insights',
		content : 'Customer Insights',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/customer Insights.svg"
			alt="insights"
		/>,
	},
];
export default IconMapping;
