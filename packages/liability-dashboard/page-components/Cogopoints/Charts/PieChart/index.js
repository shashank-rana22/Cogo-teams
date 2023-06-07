import { ResponsivePie } from '@cogoport/charts/pie';

import pieChartData from '../../../../configuration/pie-chart-data';

const { data } = pieChartData();
function PieChart() {
	return (
		<ResponsivePie
			data={data}
			width="200px"
			height="200px"
			margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
			sortByValue
			activeInnerRadiusOffset={13}
			activeOuterRadiusOffset={14}
			borderColor={{
				from      : 'color',
				modifiers : [['darker', 0.2]],
			}}
			enableArcLinkLabels={false}
			arcLinkLabelsSkipAngle={16}
			arcLinkLabelsTextColor="#333333"
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: 'color' }}
			arcLabelsRadiusOffset={0.6}
			arcLabelsSkipAngle={16}
			arcLabelsTextColor={{
				from      : 'color',
				modifiers : [['darker', 2]],
			}}
			legends={[]}
		/>
	);
}

export default PieChart;
