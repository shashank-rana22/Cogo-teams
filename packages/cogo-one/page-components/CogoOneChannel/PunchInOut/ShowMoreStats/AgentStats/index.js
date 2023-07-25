import { Select } from '@cogoport/components';
import { useState } from 'react';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../configurations/agent-wise-feedback-mapping';

import AgentActivityGraph from './AgentActivitiesGraph';
import Stats from './Stats';
import styles from './styles.module.css';

const FILTER_LABEL_MAPPING = {
	day   : 'Today',
	week  : 'Weekly',
	month : 'Monthly',
};

function AgentStats() {
	const [value, setValue] = useState('day');
	return (
		<>
			<div className={styles.header_div}>
				<div className={styles.header}>
					Hi Anuradha,
				</div>
				<div className={styles.sub_label}>
					This is how you have interacted with your clients
					<span>{FILTER_LABEL_MAPPING[value]}</span>
				</div>
			</div>
			<div className={styles.stats_content}>
				<div className={styles.left_div}>
					<Stats />
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
