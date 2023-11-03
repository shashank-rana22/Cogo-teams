import React, { useMemo } from 'react';

import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';

import styles from './styles.module.css';

function CustomerBased() {
	const data = useMemo(
		() => ({
			labels: ['Total Quotation Sent (100)',
				'Total No. of Transactions (80)',
				'Total Active Transactions (60)',
				'Total Released Revenue (50)',
				'Total Invoiced Revenue (50)'],
			colors: [
				['#FBD1A6'],
				['#CFEAED'],
			],
			values: [
				[711111, 422222],
				[611111, 322222],
				[511111, 222222],
				[410110, 120220],
				[300000, 100000],

			],
		}),
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Customer Based</div>

				<div className={styles.legends}>
					<div className={styles.legends_circle} style={{ background: '#FBD1A6' }} />
					<div>Allocated</div>
					<div className={styles.legends_circle} style={{ background: '#CFEAED' }} />
					<div>Un-Allocated</div>
				</div>
			</div>

			<FunnelGraphStruct
				data={data}
				type="customer"
			/>
		</div>
	);
}

export default CustomerBased;
