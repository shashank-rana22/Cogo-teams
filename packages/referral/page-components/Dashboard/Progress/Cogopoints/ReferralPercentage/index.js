import React from 'react';

import styles from './styles.module.css';

function ReferralPercentage({ data = {} }) {
	return (
		<div className={styles.container}>

			{(data || []).map((type) => {
				const { color = '', value = '', id = '' } = type || {};
				return (
					<div className={styles.pair} key={id}>
						<div className={styles.circle} style={{ background: `${color}` }} />
						<div className={styles.name}>
							{value}
							%
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default ReferralPercentage;
