import { isEmpty } from '@cogoport/utils';

import ScoringGraph from './ScoringGraph';
import styles from './styles.module.css';
import TodayScoreCard from './TodayScoreCard';

function RankingAndScoring(props) {
	const { scoringGraphData } = props;

	const { data_points = [] } = scoringGraphData || {};

	if (!isEmpty(data_points) && data_points.length === 1) {
		return <TodayScoreCard scoringGraphData={scoringGraphData} />;
	}

	return (
		<div className={styles.container}>
			<ScoringGraph scoringGraphData={scoringGraphData} />
		</div>
	);
}

export default RankingAndScoring;
