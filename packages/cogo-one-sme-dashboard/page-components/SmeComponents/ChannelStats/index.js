import React from 'react';

import useSmeDashboardStats from '../../../hooks/useSmeDashboardStats';

import CallsMadeStats from './CallsMadeStats';
import CallsReceivedStats from './CallsReceivedStats';
import ReceivedStats from './ReceivedStats';
import SentStats from './SentStats';
import styles from './styles.module.css';

function ChannelStats({
	channelType = '',
	widgetBlocks = null,
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	if (channelType === 'calls') {
		return (
			<div className={styles.container}>
				<CallsMadeStats
					channelType={channelType}
					dashboardData={dashboardData}
					dashboardLoading={dashboardLoading}
				/>
				<CallsReceivedStats
					channelType={channelType}
					dashboardData={dashboardData}
					dashboardLoading={dashboardLoading}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<SentStats
				channelType={channelType}
				dashboardData={dashboardData}
				dashboardLoading={dashboardLoading}
			/>
			<ReceivedStats
				channelType={channelType}
				dashboardData={dashboardData}
				dashboardLoading={dashboardLoading}
			/>
		</div>
	);
}

export default ChannelStats;
