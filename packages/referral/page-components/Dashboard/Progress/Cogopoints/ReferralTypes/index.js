import React from 'react';

import styles from './styles.module.css';

function ReferralTypes() {
	const referralTypes = [
		{
			color : '#ABCD62',
			name  : 'KYC',
		},
		{
			color : '#88CAD1',
			name  : 'Shipment',
		},
		{
			color : '#FCDC00',
			name  : 'Subscription',
		},

	];

	return (
		<div className={styles.container}>

			{(referralTypes || []).map((type) => {
				const { color = '', name = '' } = type || {};
				return (
					<div className={styles.pair}>
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
