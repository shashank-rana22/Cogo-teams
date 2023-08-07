import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../../configurations/agent-wise-feedback-mapping';
import useGetCogoOneAgentStats from '../../../../../../hooks/useGetOmniChannelStats';
import useListAgentCheckout from '../../../../../../hooks/useListAgentCheckout';
import useListAssignedChats from '../../../../../../hooks/useListAssignedChats';

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
	const { data = {}, loading = false } = useGetCogoOneAgentStats({ value });

	const { calls = [] } = data || {};
	const { sales_dashboard_stats = {} } = shipmentData || {};
	const { booked = 0, total_sent = 0, expired = 0 } = sales_dashboard_stats || {};

	const totalQuotationSend = total_sent + booked + expired;

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
						totalQuotationSend={totalQuotationSend}
						booked={booked}
						statsData={statsData}
						calls={calls}
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
						loading={shiplentLoading || loading || statsLoading}
						bookingCount={booked}
						callData={calls}
						statsData={statsData}
					/>
				</div>
			</div>
		</div>
	);
}

export default AgentStats;
