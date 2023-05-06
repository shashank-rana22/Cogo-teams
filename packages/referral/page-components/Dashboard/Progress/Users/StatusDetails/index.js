import React from 'react';

import styles from './styles.module.css';

function StatusDetails() {
	const usersCount = [
		{
			label : 'Invited User',
			value : 20 || 0,
			color : '#7278AD',
		},
		{
			label : 'Signed Up Users',
			value : 30 || 0,
			color : '#888FD1',
		},
		{
			label : 'KYC Registered Users',
			value : 40 || 0,
			color : '#ABB0DE',
		},
		{
			label : 'Affiliate Users',
			value : 50 || 0,
			color : '#CED1ED',
		},
		{
			label : 'Employees',
			value : 60 || 0,
			color : '#F2F3FA',
		},
	];

	return (
		<div className={styles.container}>
			{(usersCount || []).map((item) => (
				<div className={styles.stats}>
					<div className={styles.circle} style={{ background: `${item?.color}` }} />
					<div className={styles.count}>
						{item.value}
					</div>
					<div className={styles.label}>{item.label}</div>
				</div>
			))}
		</div>
	);
}

export default StatusDetails;
