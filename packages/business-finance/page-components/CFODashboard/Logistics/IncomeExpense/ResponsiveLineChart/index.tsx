import { ResponsiveLine } from '@cogoport/charts/line/index';

import { getAmountInLakh } from '../../getAmountInLakh';

function ResponsiveLineChart({ lineData }) {
	const lineChartData = [
		{
			id    : 'india',
			color : '#ACDADF',
			data  : [],
		},
	];
	(lineData || []).forEach((item:any) => {
		const pushData = {
			y : Number(item.income - item.expense),
			x : item.month,
		};
		lineChartData[0].data.push(pushData);
	});
	console.log(lineChartData, 'lineChartData');

	return (
		<ResponsiveLine
			data={lineChartData}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat={(value) => getAmountInLakh(value)}
			enableGridX={false}
			enablePointLabel
			colors="#ACDADF"
			axisBottom={{
				tickSize: 0, tickPadding: 10, tickRotation: 0,
			}}
			axisLeft={{
				tickSize       : 0,
				tickPadding    : -3,
				tickRotation   : 0,
				legendOffset   : 40,
				legendPosition : 'middle',
				format         : (value) => `${getAmountInLakh(value)}`,
			}}
			pointSize={6}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor="#6FA5AB"
			useMesh

		/>
	);
}
export default ResponsiveLineChart;
