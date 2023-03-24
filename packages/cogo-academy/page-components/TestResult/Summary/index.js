import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import QuestionWiseStats from '../../UserDashboard/commons/QuestionWiseStats';

import BarChart from './BarChart';
import Overview from './Overview';
import styles from './styles.module.css';

const colorArray = ['hsla(232, 44%, 96%, 1)', 'hsla(234, 46%, 87%, 1)', 'hsla(234, 46%, 87%, 1)'];

const radialChartData = (question_stats) => {
	const data = [];
	const questionAnswered = {
		id   : 'Questions Answered',
		data : [
			{
				x     : 'Attempted',
				y     : 0,
				color : 'hsla(41, 64%, 86%, 1)',
			},
			{
				x     : 'Correct',
				y     : question_stats.correct_questions,
				color : 'hsla(79, 52%, 72%, 1)',
			},
			{
				x     : 'Incorrect',
				y     : question_stats.incorrect_questions,
				color : 'hsla(5, 85%, 82%, 1)',
			},
		],
	};
	const totalAnswered = {
		id   : 'Questions Attempted',
		data : [
			{
				x     : 'Attempted',
				y     : question_stats.question_attempted,
				color : 'hsla(41, 64%, 86%, 1)',
			},
			{
				x     : 'Correct',
				y     : 0,
				color : 'hsla(79, 52%, 72%, 1)',
			},
			{
				x     : 'Incorrect',
				y     : 0,
				color : 'hsla(5, 85%, 82%, 1)',
			},
		],
	};
	data.push(totalAnswered);
	data.push(questionAnswered);
	return data;
};

function Summary({ summaryData = {}, loading = false }) {
	const {
		topics_covered = {},
		time_taken = '',
		difficulty_wise_stats = {},
		topic_wise_percentile = {},
		user_percentile = 0,
		question_stats = {},
	} = summaryData;

	const getDifficultyData = () => {
		const data = [];
		Object.keys(difficulty_wise_stats).forEach((key, index) => {
			const obj = {
				label : startCase(key.split('_')[0]),
				// percentile : difficulty_wise_stats[key]?.toFixed(2),
				color : colorArray[index],
			};
			data.push(obj);
		});
		return data;
	};

	const getTopicWiseData = () => {
		const data = [];
		Object.keys(topic_wise_percentile).forEach((key, index) => {
			const obj = {
				label      : startCase(key),
				percentile : topic_wise_percentile[key].toFixed(2),
				color      : colorArray[index],
			};
			data.push(obj);
		});
		return data;
	};

	if (loading) {
		return (
			<Placeholder height="280px" width="100%" margin="40px 0px 20px 0px" borderRadius="6px" />
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.overview}>
				<Overview topics_covered={topics_covered} time_taken={time_taken} />
			</div>

			<div className={styles.radial_charts}>

				<div className={styles.percentile_chart_item}>
					<div className={styles.percentile_heading}>Percentile</div>

					<div className={styles.percentile_data}>
						{user_percentile.toFixed(2)}
						%
					</div>

				</div>

				<div className={styles.radial_chart_item}>
					<QuestionWiseStats height="250px" width="250px" />
				</div>

			</div>

			<div className={styles.bar_charts}>
				<div className={styles.bar_chart_item}>

					<div className={styles.bar_chart_heading}>Topic Wise Percentile</div>

					<div className={styles.bar_chart}>
						<BarChart chart_data={getTopicWiseData()} />
					</div>

				</div>

				<div className={styles.bar_chart_item}>

					<div className={styles.bar_chart_heading}>Level of Difficulty</div>

					<div className={styles.bar_chart}>
						<BarChart chart_data={getDifficultyData()} />
					</div>

				</div>

			</div>

		</div>
	);
}

export default Summary;
