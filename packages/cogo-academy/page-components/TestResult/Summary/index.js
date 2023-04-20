import { startCase } from '@cogoport/utils';

import toFixed from '../../CreateModule/utils/toFixed';
import QuestionWiseStats from '../../UserDashboard/commons/QuestionWiseStats';

import BarChart from './BarChart';
import Overview from './Overview';
import styles from './styles.module.css';

function Summary({ summaryData = {} }) {
	const {
		topics_covered = {},
		time_taken = '',
		difficulty_wise_stats = {},
		topic_wise_percentile = {},
		user_percentile = 0,
		question_stats = {},
	} = summaryData;

	const getDifficultyData = () => (Object.keys(difficulty_wise_stats).map((key, index) => ({
		label      : startCase(key.split('_')[0]),
		percentile : toFixed(difficulty_wise_stats[key], 2),
		color      : index === 0 ? 'hsla(232, 44%, 96%, 1)' : 'hsla(234, 46%, 87%, 1)',
	})));

	const getTopicWiseData = () => (Object.keys(topic_wise_percentile).map((key, index) => ({
		label      : startCase(key),
		percentile : toFixed(topic_wise_percentile[key], 2),
		color      : index === 0 ? 'hsla(232, 44%, 96%, 1)' : 'hsla(234, 46%, 87%, 1)',
	})));

	return (
		<div className={styles.container}>
			<div className={styles.overview}>
				<Overview topics_covered={topics_covered} time_taken={time_taken} />
			</div>

			<div className={styles.chart_container}>
				<div className={styles.radial_charts}>
					<div className={styles.percentile_chart_container}>
						<div className={styles.percentile_chart_item}>
							<div className={styles.percentile_heading}>Percentile</div>

							<div className={styles.percentile_data}>
								{user_percentile.toFixed(2)}
								%
							</div>

						</div>
					</div>

					<div className={styles.radial_chart_item}>

						<div className={styles.chart_item}>
							<QuestionWiseStats
								height="250px"
								width="250px"
								question_stats={question_stats}
							/>

							<div className={styles.question_count}>
								<span>Questions: </span>
								<span>{question_stats?.total_questions || 0}</span>
							</div>

						</div>

					</div>
				</div>

				<div className={styles.bar_charts}>
					<div className={styles.bar_chart_item}>
						<div className={styles.bar_chart_heading}>Topic Wise Percentile</div>

						<div className={styles.bar_chart}>
							<BarChart chart_data={getTopicWiseData()} yAxis="Percentile" />
						</div>
					</div>

					<div className={styles.bar_chart_item}>
						<div className={styles.bar_chart_heading}>Level of Difficulty</div>

						<div className={styles.bar_chart}>
							<BarChart chart_data={getDifficultyData()} yAxis="Percentile" />
						</div>
					</div>

				</div>
			</div>

		</div>
	);
}

export default Summary;
