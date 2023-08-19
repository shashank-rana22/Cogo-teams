import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../../configurations/agent-wise-feedback-mapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';
import useListAgentCheckout from '../../../../../../hooks/useListAgentCheckout';
import useListAssignedChats from '../../../../../../hooks/useListAssignedChats';

import AgentActivityGraph from './AgentActivitiesGraph';
import Stats from './Stats';
import styles from './styles.module.css';

function AgentStats({
	showDetails = false, name = '', viewType = '', AgentStatsLoading = false,
	AgentStatsData = {}, timePeriodValue = '',
	setTimePeriodValue = () => {},
}) {
	const {
		shiplentLoading = false,
		shipmentData = {},
	} = useListAgentCheckout({ value: timePeriodValue, showDetails });

	const { statsData = {}, statsLoading = false } = useListAssignedChats({ value: timePeriodValue });

	const { calls = [] } = AgentStatsData || {};
	const { sales_dashboard_stats = {} } = shipmentData || {};
	const { booked = 0, total_sent = 0 } = sales_dashboard_stats || {};

	const totalQuotationSend = total_sent + booked;

	return (
		<div className={styles.section}>
			<div className={styles.header_container}>
				<div className={styles.header}>
					Hi
					<span>{startCase(name)}</span>
					,
				</div>
				<div className={styles.sub_label}>
					This is how you have interacted with your clients.
				</div>
			</div>
			<div className={styles.stats_content}>
				<div className={styles.stats_count_container}>
					<Stats
						totalQuotationSend={totalQuotationSend}
						booked={booked}
						statsData={statsData}
						calls={calls}
						loading={shiplentLoading || AgentStatsLoading || statsLoading}
						viewType={viewType}
						AgentStatsData={AgentStatsData}
						timePeriodValue={timePeriodValue}
					/>
				</div>
				<div className={styles.graph_container}>
					<div className={styles.wrap}>
						<div className={styles.title}>Activities at a glance</div>
						<Select
							value={timePeriodValue}
							onChange={(val) => {
								setTimePeriodValue(val);
							}}
							size="sm"
							placeholder="Select Books"
							options={TIMELINE_FILTER_OPTIOINS}
							className={styles.select_section}
						/>
					</div>
					{VIEW_TYPE_GLOBAL_MAPPING[viewType]?.to_show_agent_activity_graph && (
						<AgentActivityGraph
							loading={shiplentLoading || AgentStatsLoading || statsLoading}
							bookingCount={booked}
							callData={calls}
							statsData={statsData}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default AgentStats;
