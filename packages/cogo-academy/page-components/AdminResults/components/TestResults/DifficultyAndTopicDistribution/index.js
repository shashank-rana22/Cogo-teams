import { startCase } from '@cogoport/utils';

import BarChart from '../../../../TestResult/Summary/BarChart';

const colorArray = ['hsla(232, 44%, 96%, 1)', 'hsla(234, 46%, 87%, 1)', 'hsla(234, 46%, 87%, 1)'];

const getDifficultyData = (difficulty_wise_stats = {}) => {
	const data = [];

	Object.keys(difficulty_wise_stats).forEach((key, index) => {
		const obj = {
			label      : startCase(key.split('_')[0]),
			percentile : difficulty_wise_stats[key]?.toFixed(2),
			color      : colorArray[index],
		};
		data.push(obj);
	});

	return data;
};

const getTopicWiseData = (topic_wise_percentile = {}) => {
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

function DifficultyAndTopicDistribution({ data = {}, toggleState = false }) {
	const { difficulty_wise_stats, topic_wise_percent } = data;

	return (
		<div>
			<div style={{ display: 'flex', marginTop: '-50px' }}>
				{toggleState ? (
					<BarChart chart_data={getDifficultyData(difficulty_wise_stats)} yAxis="Correct Answer %" />
				) : (
					<BarChart chart_data={getTopicWiseData(topic_wise_percent)} yAxis="Correct Answer %" />
				)}
			</div>

		</div>
	);
}

export default DifficultyAndTopicDistribution;
