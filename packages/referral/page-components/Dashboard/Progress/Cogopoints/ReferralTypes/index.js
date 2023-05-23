import React from 'react';

import { REFERRAL_TYPES } from '../../../../../constants';

import styles from './styles.module.css';

function ReferralTypes() {
	return (
		<div className={styles.container}>

			{(REFERRAL_TYPES || []).map((type) => {
				const { color = '', name = '' } = type || {};
				return (
					<div className={styles.pair} key={name}>
						<div className={styles.circle} style={{ background: `${color}` }} />
						<div className={styles.name}>
							{name}
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default ReferralTypes;
