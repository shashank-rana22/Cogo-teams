import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const func = () => {};

const ListButtons = ({
	item = {},
	activeTab = '',
	setActivityModal = func,
	setShowPopover = func,
}) => {
	const router = useRouter();
	const referrer_id = '35254cf5-6b35-41fb-8178-553bf708cc44';
	const buttonOptions = [
		// {
		// 	children: (
		// 		<div className={styles.label}>
		// 			Reassign Nodes
		// 		</div>
		// 	),
		// 	onClick    : () => {},
		// 	conditions : ['invited', 'affiliate', 'employees', 'users'],
		// },
		{
			children: (
				<div className={styles.label}>
					Show Network
				</div>
			),
			onClick: () => {
				router.push(
					'/referral/dashboard/[referrer_id]',
					`/referral/dashboard/${referrer_id}`,
				);
			},
			conditions: ['user', 'affiliate'],
		},
		// {
		// 	children: (
		// 		<div className={styles.label}>
		// 			Disable
		// 		</div>
		// 	),
		// 	onClick    : () => {},
		// 	conditions : ['affiliate', 'employees'],
		// },
		// {
		// 	children: (
		// 		<div className={styles.label}>
		// 			Enable
		// 		</div>
		// 	),
		// 	onClick    : () => {},
		// 	conditions : ['invited', 'users'],
		// },
		{
			children: (
				<div className={styles.label}>
					Activity Log
				</div>
			),
			onClick: () => {
				setActivityModal(true);
				setShowPopover(false);
			},
			conditions: ['affiliate', 'user'],
		},
		// {
		// 	children: (
		// 		<div className={styles.label}>
		// 			Reward Report
		// 		</div>
		// 	),
		// 	onClick    : () => {},
		// 	conditions : ['affiliate', 'employees', 'users'],
		// },
		{
			children: (
				<div className={styles.label}>
					View Profile
				</div>
			),
			onClick    : () => {},
			conditions : ['affiliate', 'user'],
		},

	];

	return buttonOptions.filter(
		(itm) => (
			itm.conditions.includes(activeTab)
		),
	);
};

export default ListButtons;
