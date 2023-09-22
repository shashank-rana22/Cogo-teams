import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';

import styles from './styles.module.css';
import useGetAgentScoringReportStats from './useGetAgentScoringReportStats';

function RightPanel() {
	const { data } = useGetAgentScoringReportStats();

	const {
		block_wise_stats: activityData = {},
		graph_data: scoringGraphData = {},
	} = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.entity_tag}>
				<div className={styles.badge} />

				<div>Cogo India</div>
			</div>

			<RankingAndScoring scoringGraphData={scoringGraphData} />

			<IncentiveSnapshot />

			<Activity activityData={activityData} />
		</div>
	);
}

export default RightPanel;
