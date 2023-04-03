import { startCase } from '@cogoport/utils';

import toFixed from '../../../../CreateModule/utils/toFixed';
import BarChart from '../../../../TestResult/Summary/BarChart';

const colorArray = ['hsla(232, 44%, 96%, 1)', 'hsla(234, 46%, 87%, 1)', 'hsla(234, 46%, 87%, 1)'];

function DifficultyAndTopicDistribution({ data = {}, toggleState = false }) {
	const { difficulty_wise_stats, topic_wise_percent } = data || {};

	const getBarChartData = ({ chart_data = {} }) => (Object.keys(chart_data).map((key, index) => ({
		label      : toggleState ? startCase(key) : startCase(key.split('_')[0]),
		percentile : toFixed(data[key], 2),
		color      : colorArray[index],
	})));

	const chart_data = toggleState
		? getBarChartData({ chart_data: topic_wise_percent }) : getBarChartData({ chart_data: difficulty_wise_stats });
	return (
		<div style={{ display: 'flex', marginRight: '12px' }}>
			<BarChart chart_data={chart_data} yAxis="Correct Answer %" />
		</div>
	);
}

export default DifficultyAndTopicDistribution;
