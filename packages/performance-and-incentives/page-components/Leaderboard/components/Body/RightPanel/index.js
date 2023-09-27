import LoadingState from '../../../../../common/LoadingState';
import getEntityNameById from '../../../../../utils/get-entity-name-by-id';
import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';

import styles from './styles.module.css';

function RightPanel(props) {
	const { data, loading, entity } = props;

	const {
		block_wise_stats: activityData = {},
		graph_data: scoringGraphData = {},
		incentive_snapshot: incentiveSnapshotData = {},
	} = data || {};

	const COGO_ENTITY = getEntityNameById(entity);

	if (loading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.entity_tag}>
				<div className={styles.badge} />

				<div>{COGO_ENTITY}</div>
			</div>

			<RankingAndScoring scoringGraphData={scoringGraphData} />

			<IncentiveSnapshot incentiveSnapshotData={incentiveSnapshotData} />

			<Activity activityData={activityData} />
		</div>
	);
}

export default RightPanel;
