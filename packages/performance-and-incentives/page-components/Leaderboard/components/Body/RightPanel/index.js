import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';
import getRightPanelHeading from '../../../helpers/getRightPanelHeading';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function RightPanel(props) {
	const { data, loading, entity, currLevel } = props;

	const {
		block_wise_stats: activityData = {},
		graph_data: scoringGraphData = {},
		incentive_snapshot: incentiveSnapshotData = {},
	} = data || {};

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const HEADING = getRightPanelHeading({ currLevel, entity, viewType });

	if (loading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!isEmpty(HEADING) && (
				<div className={styles.entity_tag}>
					<div className={styles.badge} />

					<div>{HEADING}</div>
				</div>
			)}

			<RankingAndScoring scoringGraphData={scoringGraphData} />

			<IncentiveSnapshot incentiveSnapshotData={incentiveSnapshotData} />

			<Activity activityData={activityData} />
		</div>
	);
}

export default RightPanel;
