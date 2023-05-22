import { IcCCogoCoin } from '@cogoport/icons-react';
import React from 'react';

import styles from '../styles.module.css';

function NetWorkCommission({ networkReferralData = [] }) {
	return (
		<>
			<div className={styles.commission}>Network Commission:</div>

			{networkReferralData.map((item) => (
				<div className={styles.user_profile} key={item}>
					<IcCCogoCoin
						width={20}
						height={20}
						className={styles.contact_icon}
						fill="#BDBDBD"
					/>
					<div className={styles.earned_points}>{item.value}</div>
					<div className={styles.flex_details}>
						{' '}
						{item.label}
					</div>
				</div>
			))}
		</>
	);
}

export default NetWorkCommission;
