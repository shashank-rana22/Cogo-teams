import { Placeholder } from '@cogoport/components';
import { IcMDataPipeline } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import dataFormatter from './dataFormatter';
import styles from './styles.module.css';

function SelectedStats({
	hierarchyData = [],
	dashboardData = {},
	dashboardLoading = false,
}) {
	const { performance_data = {} } = dashboardData || {};

	const data = dataFormatter({ performance_data });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<IcMDataPipeline className={styles.stats_icon} />

				<div className={styles.header_name}>
					{isEmpty(hierarchyData)
						? 'Entire Organization'
						: hierarchyData?.[(hierarchyData?.length || 0) - 1]?.name}
					{' '}
					Stats
				</div>
			</div>

			<div className={styles.data_container}>
				{Object.entries(data).map(
					([key, valueKeys]) => (
						<div
							key={key}
							className={styles.data_row}
						>
							<div className={styles.label_data}>
								{valueKeys.label}
							</div>

							<div className={styles.value_data}>
								{dashboardLoading
									? <Placeholder height={21} width={60} />
									: valueKeys?.value || '-'}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default SelectedStats;
