import React, { useMemo } from 'react';

import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function LeadsData({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const data = useMemo(
		() => ({
			labels: ['Raw Data',
				'AQL',
				'MQL',
				'SAL'],
			colors: [
				['#7278AD', '#CED1ED'],
				['#EDD7A9', '#F8F2E7'],
			],
			values: [
				[623, 310],
				[517, 150],
				[213, 50],
				[71, 10],
			],
		}),
		[],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				{'Raw Data -> AQL -> MQL -> SAL -> SQL -> Transacting A/c -> Churned Customer'}
			</div>

			<div className={styles.legends}>
				<div className={styles.legends_circle} style={{ background: '#7278AD' }} />
				<div>Allocated</div>
				<div className={styles.legends_circle} style={{ background: '#EDD7A9' }} />
				<div>Un-Allocated</div>
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

export default LeadsData;
