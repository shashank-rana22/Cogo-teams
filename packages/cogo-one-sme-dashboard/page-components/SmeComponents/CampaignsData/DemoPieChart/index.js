import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import { demoConstants } from '../../../../constants/DemoConstants';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';
import getFormattedAmount from '../../../../utils/getFormattedAmount';

import styles from './styles.module.css';

function DemoPieChart({
	widgetBlocks = null,
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { chat_and_demo_data = {} } = dashboardData || {};

	if (dashboardLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading_header}>
					Chat and Demo
				</div>
				<div className={styles.loading_container}>
					<LoadingState loaderCount={10} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{demoConstants.map(
				(itm) => (
					<div key={itm?.id} className={styles.body}>
						<div className={styles.header}>
							{itm?.icon}
							{itm?.header}
						</div>

						{(itm?.options || []).map(
							(option) => (
								<div
									className={styles.option_styles}
									key={option?.id}
								>
									<div className={styles.label}>
										{option?.label}
									</div>
									<div className={styles.value}>
										{getFormattedAmount({ number: chat_and_demo_data?.[option?.count] || 0 })}
									</div>
								</div>
							),
						)}
					</div>
				),
			)}
		</div>
	);
}

export default DemoPieChart;
