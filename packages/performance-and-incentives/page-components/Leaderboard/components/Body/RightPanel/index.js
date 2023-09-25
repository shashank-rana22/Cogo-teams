// import getEntityNameById from '../../../../../utils/get-entity-name-by-id';
import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';

import styles from './styles.module.css';
import useGetAgentScoringReportStats from './useGetAgentScoringReportStats';

function RightPanel(props) {
	const { dateRange, entity } = props;

	const { data } = useGetAgentScoringReportStats({ dateRange, entity });

	const {
		block_wise_stats: activityData = {},
		graph_data: scoringGraphData = {},
		incentive_snapshot: incentiveSnapshotData = {},
	} = data || {};

	// const COGO_ENTITY = getEntityNameById(entity);

	return (
		<div className={styles.container}>
			{/* <div className={styles.entity_tag}>
				<div className={styles.badge} />

				<div>{COGO_ENTITY}</div>
			</div> */}

			<RankingAndScoring scoringGraphData={scoringGraphData} />

			<IncentiveSnapshot incentiveSnapshotData={incentiveSnapshotData} />

			<Activity activityData={activityData} />
		</div>
	);
}

export default RightPanel;
