import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const DATA = {
	email: {
		total             : 150,
		agent_percentage  : 67,
		system_percentage : 17,
	},
	whatsapp: {
		total             : 2489,
		agent_percentage  : 37,
		system_percentage : 63,
	},
};

const MESSAGE_TYPES = ['auto', 'agent', 'marketing'];

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
				{MESSAGE_TYPES.map((itm) => (
					<div
						key={itm}
						className={styles.message_type_stats}
					>
						k
					</div>
				))}
			</div>
		</div>
	);
}

export default SentStats;
