import { Select } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { TIMELINE_FILTER_OPTIOINS } from '../../../../../configurations/agent-wise-feedback-mapping';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../constants/viewTypeMapping';
import useListAgentCheckout from '../../../../../hooks/useListAgentCheckout';
import useListAssignedChats from '../../../../../hooks/useListAssignedChats';

import AgentActivityGraph from './AgentActivitiesGraph';
import Stats from './Stats';
import styles from './styles.module.css';

function AgentStats({
	showDetails = false, name = '', viewType = '', agentStatsLoading = false,
	agentStatsData = {}, timePeriodValue = '',
	setTimePeriodValue = () => {},
}) {
	const {
		shiplentLoading = false,
		shipmentData = {},
	} = useListAgentCheckout({ value: timePeriodValue, showDetails });

	const { statsData = {}, statsLoading = false } = useListAssignedChats({ value: timePeriodValue, viewType });

	const { calls = [] } = agentStatsData || {};
	const { sales_dashboard_stats = {} } = shipmentData || {};
	const { booked = 0, total_sent = 0 } = sales_dashboard_stats || {};

	const totalQuotationSend = total_sent + booked;

	const isShowActivityGraph = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.to_show_agent_activity_graph;

	return (
		<div className={styles.section}>
			<div className={styles.header_container}>
				<div className={styles.header_sub_label}>
					<div className={styles.header}>
						Hi
						<span>
							{startCase(name)}
							,
						</span>
					</div>
					<div className={styles.sub_label}>
						This is how you have interacted with your clients.
					</div>
				</div>
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

			<div className={styles.stats_content}>
				<div className={styles.stats_count_container}>
					<Stats
						totalQuotationSend={totalQuotationSend}
						booked={booked}
						statsData={statsData}
						calls={calls}
						loading={shiplentLoading || agentStatsLoading || statsLoading}
						viewType={viewType}
						agentStatsData={agentStatsData}
						timePeriodValue={timePeriodValue}
						isShowActivityGraph={isShowActivityGraph}
					/>
				</div>
				{isShowActivityGraph && (
					<div className={styles.graph_container}>
						<div className={styles.title}>Activities at a glance</div>
						<AgentActivityGraph
							loading={shiplentLoading || agentStatsLoading || statsLoading}
							bookingCount={booked}
							callData={calls}
							statsData={statsData}
						/>

					</div>
				)}

			</div>
		</div>
	);
}

export default AgentStats;
