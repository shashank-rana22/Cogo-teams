import {
	IcMSearchdark,
	IcMDocument, IcMTag,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

const repair = (
	<svg width="11" height="10" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M2.21118 0.813148L4.66582 2.74934C4.66582
			2.74934 4.71661 3.38273 4.07669 4.07151C3.43677 4.76029
			2.74606 4.81568 2.74606 4.81568L0.264849 2.88162C0.0417856 4.10088
			0.582107 5.50409 1.60881 6.30439C3.14887 7.50484 4.88815 6.18851 5.28743
			6.49974C7.53462 8.18287 9.28096 9.9552 9.36457 9.99753C10.0205 10.5088 11.0054
			10.4544 11.5469 9.87156C12.0884 9.28874 11.9895 8.38951 11.3336 7.87821C11.248
			7.81152 8.97112 6.42498 6.83214 4.75769C6.43287 4.44646 7.65879 2.72998 6.08826
			1.48293C5.06351 0.706992 3.48947 0.416422 2.21118 0.813148ZM10.8972 8.77133C10.9245
			9.11238 10.6538 9.40379 10.2819 9.43362C9.88338 9.46557 9.56966 9.22104 9.54231 8.87998C9.51496
			8.53893 9.7857 8.24752 10.1576 8.21769C10.5295 8.18787 10.8698 8.43027 10.8972 8.77133Z"
			fill="white"
		/>
	</svg>
);
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
		content : 'Organization Details',
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
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/user-actrivity.svg"
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
		hide: true,
	},
	{
		name    : 'tickets',
		content : 'Tickets',
		icon:
		(
			<div className={styles.tag_container}>
				<div className={styles.repair_div}>{repair}</div>
				<IcMTag width={26} height={26} />
			</div>
		),

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
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/customer-insight.svg"
			alt="insights"
		/>,
	},
	{
		name    : 'documents',
		content : 'Documents',
		icon    : <IcMDocument width={18} height={18} />,
	},
	{
		name    : 'help_desk',
		content : 'Help Desk',
		icon    : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/faq-icon-final.svg"
			alt="faq"
			style={{ width: '25px', heigh: '25px' }}
		/>,
	},
];

export default IconMapping;
