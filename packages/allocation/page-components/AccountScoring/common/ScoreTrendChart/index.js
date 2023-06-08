import { ResponsiveLine } from '@cogoport/charts/line';

const getColor = ({ current_position, previous_position }) => {
	if (!current_position || !previous_position) return '#13c0d4';

	const trend = current_position - previous_position;

	if (trend === 0) {
		return '#13c0d4';
	}

	return (trend < 0 ? '#34C759' : '#ED3726');
};

function ScoreTrendChart(props) {
	const { item } = props;
	return (
		<ResponsiveLine
			data={[item] || []}
			width={100}
			height={20}
			colors={getColor(item)}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={null}
			axisLeft={null}
			enableGridX={false}
			enableGridY={false}
			lineWidth={1}
			enablePoints={false}
			pointSize={2}
			pointColor={{ theme: 'background' }}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			areaOpacity={0}
			isInteractive={false}
			enableCrosshair={false}
			legends={[]}
			animate={false}
		/>
	);
}

export default ScoreTrendChart;
