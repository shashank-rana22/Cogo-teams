import { IcMProfile, IcACustomerCentre } from '@cogoport/icons-react';

const IconMapping = [
	{
		name : 'profile',
		icon : <IcMProfile width={20} height={20} />,
	},
	{
		name : 'organization',
		icon : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/organ-svg.svg"
			alt="organization"
			style={{ width: '20px', heigh: '20px' }}
		/>,
	},
	// {
	// 	name : 'user_activity',
	// 	icon : <img
	// 		src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/user actrivity.svg"
	// 		alt="activities"
	// 	/>,
	// },
	{
		name : 'reminder',
		icon : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/alarm-timer.svg"
			alt="reminder"
		/>,
	},
	{
		name : 'notes',
		icon : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/note.svg"
			alt="notes"
		/>,
	},
	{
		name : 'quick_actions',
		icon : <img
			src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/actions.svg"
			alt="actions"
		/>,
	},
	{
		name : 'customer_insights',
		icon : <IcACustomerCentre width={25} height={25} />,
	},
];
export default IconMapping;
