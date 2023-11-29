import React, { useMemo } from 'react';

import { LoadingState } from '../../../../common/Elements';
import FunnelGraphStruct from '../../../../common/FunnelGraphStruct';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function CustomerBased({ widgetBlocks = null, filterParams = {} }) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { customer_based_data = [] } = dashboardData || {};

	const data = useMemo(
		() => {
			const sortedCustomerData = customer_based_data?.sort(
				(a, b) => (a?.sr_no || 0) - (b?.sr_no || 0),
			);

			return {
				labels: sortedCustomerData.map(
					(itm) => `${itm?.metric || ''} (${itm?.id_count || 0})`,
				),
				colors : [['#FBD1A6'], ['#CFEAED']],
				values : sortedCustomerData?.map(
					(itm) => ([
						+((+(itm?.allocated || 0)).toFixed(2)),
						+((+(itm?.unallocated || 0)).toFixed(2)),
					]),
				),
			};
		},
		[customer_based_data],
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Customer Based</div>

				<div className={styles.legends}>
					<div
						className={styles.legends_circle}
						style={{ background: '#FBD1A6' }}
					/>
					<div>Allocated</div>

					<div
						className={styles.legends_circle}
						style={{ background: '#CFEAED' }}
					/>
					<div>Un-Allocated</div>
				</div>
			</div>

			{dashboardLoading
				? <LoadingState />
				: (
					<FunnelGraphStruct
						data={data}
						subLabels={['allocated', 'unallocated']}
						type="customer"
						showCurrency
					/>
				)}
		</div>
	);
}

export default CustomerBased;
