import React, { useMemo } from 'react';

import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';

import styles from './styles.module.css';

function CustomerInteractionFunnel() {
	const data = useMemo(
		() => ({
			labels: ['Calls made',
				'Calls connected',
				'Quotations Sent',
				'Bookings'],
			colors: [
				['#7278AD', '#CED1ED'],
				['#EDD7A9', '#F8F2E7'],
			],
			values: [
				[600, 300],
				[500, 150],
				[200, 50],
				[70, 10],
			],
		}),
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Customer Interaction Funnel</div>

				<div className={styles.legends}>
					<div className={styles.legends_circle} style={{ background: '#7278AD' }} />
					<div>Allocated</div>
					<div className={styles.legends_circle} style={{ background: '#EDD7A9' }} />
					<div>Un-Allocated</div>
				</div>
			</div>

			<FunnelGraphStruct
				data={data}
				type="campaign_data"
				showSegregation
				showDataBelow={false}
			/>
		</div>
	);
}

export default CustomerInteractionFunnel;
