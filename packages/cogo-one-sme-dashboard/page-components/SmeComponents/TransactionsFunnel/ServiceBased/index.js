import React, { useMemo } from 'react';

import { LoadingState } from '../../../../common/Elements';
import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function ServiceBased({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { service_based_data = [] } = dashboardData || {};

	const data = useMemo(() => {
		const sortedServiceData = service_based_data || [];

		return {
			labels: sortedServiceData?.map(
				(itm) => `${itm?.metric || ''} (${itm?.id_count || 0})`,
			),
			colors : [['#CFBC93'], ['#F68B21'], ['#88CAD1']],
			values : sortedServiceData?.map(
				(itm) => ([
					+((+(itm?.air || 0)).toFixed(2)),
					+((+(itm?.ocean || 0)).toFixed(2)),
					+((+(itm?.surface || 0)).toFixed(2)),
				]),
			),
		};
	}, [service_based_data]);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Service Based</div>

				<div className={styles.legends}>
					<div
						className={styles.legends_circle}
						style={{ background: '#CFBC93' }}
					/>
					<div>Ocean</div>
					<div
						className={styles.legends_circle}
						style={{ background: '#F68B21' }}
					/>
					<div>Air</div>
					<div
						className={styles.legends_circle}
						style={{ background: '#88CAD1' }}
					/>
					<div>Surface</div>
				</div>
			</div>

			{dashboardLoading
				? <LoadingState />
				: (
					<FunnelGraphStruct
						data={data}
						type="service"
						subLabels={['ocean', 'air', 'surface']}
					/>
				)}
		</div>
	);
}

export default ServiceBased;
