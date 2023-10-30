import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

function TodayScoreCard(props) {
	const { scoringGraphData } = props;

	const { data_points = [] } = scoringGraphData || {};

	const [date, score] = data_points[GLOBAL_CONSTANTS.zeroth_index] || [];

	return (
		<div>
			<h3>Scoring</h3>

			<div className={styles.container}>
				<div className={styles.date_container}>
					<div className={styles.today_date}>Today</div>
					<div className={styles.separator} />
					{date && (
						<div className={styles.today_date}>
							{formatDate({
								date,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}
						</div>
					) }
				</div>

				<div className={styles.score_container}>
					<div className={styles.score}>{score}</div>
					<div className={styles.points}>points</div>
				</div>
			</div>
		</div>
	);
}

export default TodayScoreCard;
