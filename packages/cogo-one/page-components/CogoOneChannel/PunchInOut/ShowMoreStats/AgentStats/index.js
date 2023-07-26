import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../configurations/agent-wise-feedback-mapping';
import useListAgentCheckout from '../../../../../hooks/useListAgentCheckout';

import AgentActivityGraph from './AgentActivitiesGraph';
import Stats from './Stats';
import styles from './styles.module.css';

function AgentStats({ userId = '', showDetails = false, name = '' }) {
	const [value, setValue] = useState('day');

	const {
		loading = false,
		data = {},
	} = useListAgentCheckout({ agentId: userId, value, showDetails });

	console.log(data, 'data');

	const { total_count } = data || {};

	return (
		<>
			<div className={styles.header_div}>
				<div className={styles.header}>
					Hi
					<span>{startCase(name)}</span>
					,
				</div>
				<div className={styles.sub_label}>
					This is how you have interacted with your clients
					<span>Today</span>
				</div>
			</div>
			<div className={styles.stats_content}>
				<div className={styles.left_div}>
					<Stats total_count={total_count} loading={loading} />
				</div>
				<div className={styles.graph_container}>
					<div className={styles.wrap}>
						<div className={styles.title}>Activities at a glance</div>
						<Select
							value={value}
							onChange={setValue}
							size="sm"
							placeholder="Select Books"
							options={TIMELINE_FILTER_OPTIOINS}
						/>
					</div>
					<AgentActivityGraph />
				</div>
			</div>
		</>
	);
}

export default AgentStats;
