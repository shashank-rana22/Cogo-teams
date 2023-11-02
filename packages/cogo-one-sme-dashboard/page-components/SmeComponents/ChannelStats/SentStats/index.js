import { startCase } from '@cogoport/utils';
import React from 'react';

import ChartView from './ChartView';
import styles from './styles.module.css';

const DATA = {
	email: {
		total               : 150,
		agent_percentage    : 67,
		system_percentage   : 17,
		auto_triggered      : 191,
		agent_triggered     : 294,
		marketing_triggered : 1200,
	},
	whatsapp: {
		total               : 2489,
		agent_percentage    : 37,
		system_percentage   : 63,
		auto_triggered      : 291,
		agent_triggered     : 894,
		marketing_triggered : 500,
	},
};

const MESSAGE_TYPES = {
	auto: {
		label : 'System Auto Triggered',
		value : 'auto_triggered',
	},
	agent: {
		label : 'Sent by Agent',
		value : 'agent_triggered',
	},
	marketing: {
		label : 'Triggered by Marketing',
		value : 'marketing_triggered',
	},
};

function SentStats({ channelType = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.label}>
					Total
					{' '}
					{startCase(channelType)}
					{' '}
					Sent -
					<span>{DATA?.[channelType]?.total || 0}</span>
				</div>

				<div className={styles.header_chip}>
					Initiated by Agent -
					<span className={styles.highlight}>
						{DATA?.[channelType]?.agent_percentage}
						%
					</span>
					<span className={styles.pipe_span}>|</span>
					Initiated by System -
					<span className={styles.highlight}>
						{DATA?.[channelType]?.system_percentage}
						%
					</span>
				</div>
			</div>

			<div className={styles.view_report}>
				{Object.entries(MESSAGE_TYPES).map(
					([keyValue, valueKeys]) => (
						<div
							key={keyValue}
							className={styles.message_type_stats}
						>
							{valueKeys?.label}
							{' '}
							-
							{' '}
							{DATA?.[channelType]?.[valueKeys?.value]}
							<ChartView channelType={channelType} />
						</div>
					),
				)}
			</div>
		</div>
	);
}

export default SentStats;
