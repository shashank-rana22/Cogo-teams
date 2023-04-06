import { startCase } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import BarChart from '../../../../TestResult/Summary/BarChart';

import styles from './styles.module.css';

const colorArray = ['hsla(232, 44%, 96%, 1)', 'hsla(234, 46%, 87%, 1)', 'hsla(234, 46%, 87%, 1)'];

const getBarChartData = ({ chart_data = {}, toggleState }) => (Object.keys(chart_data).map((key, index) => ({
	label      : toggleState ? startCase(key) : startCase(key.split('_')[0]),
	percentile : Math.ceil(toFixed(chart_data[key], 2)),
	color      : colorArray[index],
})));

function DifficultyAndTopicDistribution({ data = {}, toggleState = false }) {
	const { difficulty_wise_stats, topic_wise_percent } = data || {};

	const topic_wise_data = getBarChartData({ chart_data: topic_wise_percent, toggleState });
	const difficulty_wise_data = getBarChartData({ chart_data: difficulty_wise_stats, toggleState });

	const chart_data = toggleState ? topic_wise_data : difficulty_wise_data;

	return (
		<div className={styles.container}>
			<BarChart chart_data={chart_data} yAxis="Correct Answer %" />
		</div>
	);
}

export default DifficultyAndTopicDistribution;
