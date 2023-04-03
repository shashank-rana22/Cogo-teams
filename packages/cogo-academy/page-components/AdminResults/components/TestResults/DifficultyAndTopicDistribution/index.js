import { startCase } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import BarChart from '../../../../TestResult/Summary/BarChart';

const colorArray = ['hsla(232, 44%, 96%, 1)', 'hsla(234, 46%, 87%, 1)', 'hsla(234, 46%, 87%, 1)'];

const getDifficultyData = (difficulty_wise_stats = {}) => (Object.keys(difficulty_wise_stats).map((key, index) => ({
	label      : startCase(key.split('_')[0]),
	percentile : toFixed(difficulty_wise_stats[key], 2),
	color      : colorArray[index],
})));

const getTopicWiseData = (topic_wise_percentile = {}) => (Object.keys(topic_wise_percentile).map((key, index) => ({
	label      : startCase(key),
	percentile : toFixed(topic_wise_percentile[key], 2),
	color      : colorArray[index],
})));

function DifficultyAndTopicDistribution({ data = {}, toggleState = false }) {
	const { difficulty_wise_stats, topic_wise_percent } = data || {};

	const topic_wise_data = getTopicWiseData(topic_wise_percent);
	const difficulty_wise_data = getDifficultyData(difficulty_wise_stats);

	const chart_data = toggleState ? topic_wise_data : difficulty_wise_data;

	return (
		<div style={{ display: 'flex', marginRight: '12px' }}>
			<BarChart chart_data={chart_data} yAxis="Correct Answer %" />
		</div>
	);
}

export default DifficultyAndTopicDistribution;
