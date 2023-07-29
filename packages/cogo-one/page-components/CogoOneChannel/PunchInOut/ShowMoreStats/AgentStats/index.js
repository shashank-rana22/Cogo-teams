import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../configurations/agent-wise-feedback-mapping';
import useListAgentCheckout from '../../../../../hooks/useListAgentCheckout';
import useListAssignedChats from '../../../../../hooks/useListAssignedChats';
import useListCallDetails from '../../../../../hooks/useListCallDetails';

import AgentActivityGraph from './AgentActivitiesGraph';
import Stats from './Stats';
import styles from './styles.module.css';

function AgentStats({ showDetails = false, name = '' }) {
	const [value, setValue] = useState('day');

	const {
		shiplentLoading = false,
		shipmentData = {},
	} = useListAgentCheckout({ value, showDetails });

	const { statsData = {}, statsLoading = false } = useListAssignedChats({ value });

	const { callLoading = false, callData = {} } = useListCallDetails({ value });

	const { total_count: bookingCount = 0 } = shipmentData || {};

	return (
		<div className={styles.section}>
			<div className={styles.header_container}>
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
				<div className={styles.stats_count_container}>
					<Stats
						bookingCount={bookingCount}
						loading={shiplentLoading}
						statsData={statsData}
						statsLoading={statsLoading}
						callData={callData}
						callLoading={callLoading}
					/>
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
							className={styles.select_section}
						/>
					</div>
					<AgentActivityGraph
						loading={shiplentLoading || callLoading || statsLoading}
						bookingCount={bookingCount}
						callData={callData}
						statsData={statsData}
					/>
				</div>
			</div>
		</div>
	);
}

export default AgentStats;
