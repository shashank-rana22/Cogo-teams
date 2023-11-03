import React, { useMemo } from 'react';

import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';

import styles from './styles.module.css';

function ServiceBased() {
	const data = useMemo(
		() => ({
			labels: ['Total Quotation Sent (100)',
				'Total No. of Transactions (80)',
				'Total Active Transactions (60)',
				'Total Released Revenue (50)',
				'Total Invoiced Revenue (50)'],
			colors: [
				['#CFBC93', '#FFDF9D'],
				['#F68B21', '#FBD1A6'],
				['#88CAD1', '#CFEAED'],
			],
			values: [
				[711111, 422222, 422222],
				[611111, 322222, 222222],
				[511111, 222222, 222222],
				[410110, 120220, 100000],
				[300000, 100000, 99999],

			],
		}),
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Service Based</div>

				<div className={styles.legends}>
					<div className={styles.legends_circle} style={{ background: '#CFBC93' }} />
					<div>Ocean</div>
					<div className={styles.legends_circle} style={{ background: '#F68B21' }} />
					<div>Air</div>
					<div className={styles.legends_circle} style={{ background: '#88CAD1' }} />
					<div>Surface</div>
				</div>
			</div>

			<FunnelGraphStruct
				data={data}
				type="service"
			/>
		</div>
	);
}

export default ServiceBased;
