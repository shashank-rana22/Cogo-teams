import React, { useMemo } from 'react';

import { LoadingState } from '../../../../common/Elements';
import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';
import { CUSTOMER_INTERACTION_LABEL_MAPPING } from '../../../../constants';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function CustomerInteractionFunnel({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { customer_interaction_data = {} } = dashboardData || {};

	const data = useMemo(
		() => ({
			labels: CUSTOMER_INTERACTION_LABEL_MAPPING?.map(
				(itm) => itm?.label,
			),
			colors : [['#7278AD'], ['#EDD7A9']],
			values : CUSTOMER_INTERACTION_LABEL_MAPPING?.map((itm) => ([
				+((+(customer_interaction_data?.[itm?.allocated] || 0)).toFixed(2)),
				+((+(customer_interaction_data?.[itm?.unallocated] || 0)).toFixed(2)),
			])),
		}),
		[customer_interaction_data],
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

			{dashboardLoading ? <LoadingState />
				: (
					<FunnelGraphStruct
						data={data}
						type="customer_interaction"
						showSegregation
						showDataBelow={false}
						subLabels={['allocated', 'unallocated']}
					/>
				)}
		</div>
	);
}

export default CustomerInteractionFunnel;
