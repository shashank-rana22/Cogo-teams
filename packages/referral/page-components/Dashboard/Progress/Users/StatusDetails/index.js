import React from 'react';

import { handleValues } from '../../../../../utils/handleValue';

import styles from './styles.module.css';

function StatusDetails({ userData = {} }) {
	const { affiliate = 0, invited = 0, kyc_verified = 0, signed_up = 0 } = userData;
	const usersCount = [
		{
			label : 'Invited User',
			value : invited,
			color : '#7278AD',
		},
		{
			label : 'Signed Up Users',
			value : signed_up,
			color : '#888FD1',
		},
		{
			label : 'KYC Registered Users',
			value : kyc_verified,
			color : '#ABB0DE',
		},
		{
			label : 'Affiliate Users',
			value : affiliate,
			color : '#CED1ED',
		},
	];

	return (
		<div className={styles.container}>
			{(usersCount || []).map((item) => (
				<div className={styles.stats} key={item.label}>
					<div className={styles.circle} style={{ background: `${item?.color}` }} />
					<div className={styles.count}>
						{handleValues(item.value)}
					</div>
					<div className={styles.label}>{item.label}</div>
				</div>
			))}
		</div>
	);
}

export default StatusDetails;
