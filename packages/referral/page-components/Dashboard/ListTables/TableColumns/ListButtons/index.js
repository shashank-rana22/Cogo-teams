import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const ListButtons = ({
	item = {},
	activeTab = '',
}) => {
	const router = useRouter();
	const referrer_id = '35254cf5-6b35-41fb-8178-553bf708cc44';
	const buttonOptions = [
		{
			children: (
				<div className={styles.label}>
					Reassign Nodes
				</div>
			),
			onClick    : () => {},
			conditions : ['invited', 'affiliate', 'employees', 'users'],
		},
		{
			children: (
				<div className={styles.label}>
					Show Network
				</div>
			),
			onClick    : () => { router.push('/referral/[referrer_id]', `/referral/${referrer_id}`); },
			conditions : ['affiliate', 'employees', 'users'],
		},
		{
			children: (
				<div className={styles.label}>
					Disable
				</div>
			),
			onClick    : () => {},
			conditions : ['affiliate', 'employees'],
		},
		{
			children: (
				<div className={styles.label}>
					Enable
				</div>
			),
			onClick    : () => {},
			conditions : ['invited', 'users'],
		},
		{
			children: (
				<div className={styles.label}>
					Activity Log
				</div>
			),
			onClick    : () => {},
			conditions : ['invited', 'affiliate', 'employees', 'users'],
		},
		{
			children: (
				<div className={styles.label}>
					Reward Report
				</div>
			),
			onClick    : () => {},
			conditions : ['affiliate', 'employees', 'users'],
		},
		{
			children: (
				<div className={styles.label}>
					View Profile
				</div>
			),
			onClick    : () => {},
			conditions : ['invited', 'affiliate', 'employees', 'users'],
		},

	];

	return buttonOptions.filter(
		(itm) => (
			itm.conditions.includes(activeTab)
		),
	);
};

export default ListButtons;
