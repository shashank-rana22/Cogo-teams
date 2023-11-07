import { startCase } from '@cogoport/utils';
import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import ChartView from './ChartView';
import styles from './styles.module.css';

const DATA_KEYS = {
	emails: {
		total     : 'total_sent_mails',
		system    : 'total_system_mails',
		agent     : 'total_agent_mails',
		marketing : 'total_marketing_mails',
	},
	whatsapp: {
		total     : 'total_sent_whatsapp',
		system    : 'total_system_whatsapp',
		agent     : 'total_agent_whatsapp',
		marketing : 'total_marketing_whatsapp',
	},
};

const MESSAGE_TYPES = {
	system    : 'System Auto Triggered',
	agent     : 'Sent by Agent',
	marketing : 'Triggered by Marketing',
};

function SentStats({
	channelType = '',
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({
		widgetBlocks  : `get_total_${channelType}_sent_data`,
		filterParams,
		trendRequired : true,
	});

	const sentData = (dashboardData || {})?.[`total_${channelType}_sent_data`];

	const {
		current_data: currentData = {},
		previous_data: previousData = {},
	} = sentData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					Total
					{' '}
					{startCase(channelType)}
					{' '}
					Sent -
					<span>{currentData?.[DATA_KEYS?.[channelType]?.total] || 0}</span>
				</div>

				{(currentData?.initiated_by_agent || currentData?.initiated_by_system)
					? (
						<div className={styles.header_chip}>
							Initiated by Agent -
							<span className={styles.highlight}>
								{currentData?.initiated_by_agent || 0}
								%
							</span>
							<span className={styles.pipe_span}>|</span>
							Initiated by System -
							<span className={styles.highlight}>
								{currentData?.initiated_by_system || 0}
								%
							</span>
						</div>
					) : null}
			</div>

			<div className={styles.view_report}>
				{dashboardLoading
					? <LoadingState />
					: (
						<>
							{Object.entries(MESSAGE_TYPES).map(
								([keyValue, valueKey]) => (
									<div
										key={keyValue}
										className={styles.message_type_stats}
									>
										{valueKey}
										{' '}
										-
										{' '}
										{currentData?.[DATA_KEYS?.[channelType]?.[keyValue]]}
										<ChartView
											channelType={channelType}
											currentData={currentData}
											msgType={keyValue}
											previousData={previousData}
										/>
									</div>
								),
							)}
						</>
					)}
			</div>
		</div>
	);
}

export default SentStats;
