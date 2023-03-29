import { ResponsiveLine } from '@cogoport/charts/line/index';
import { getFormattedPrice } from '@cogoport/forms';

import showInTooltop from '../../../utils/getOverFlowData';
import { getAmountInLakh } from '../../getAmountInLakh';
import { getAmountInLakhCrK } from '../../getAmountInLakhCrK';

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
			y : item.income - item.expense,
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
			yFormat={(value) => getAmountInLakh(value, 'INR')}

			// yFormat={(value) => showInTooltop(
			// 	getFormattedPrice(value, 'INR'),
			// 	getAmountInLakh(value, 'INR'),
			// )}

			axisTop={null}
			axisRight={null}
			enableGridX={false}
			enablePointLabel
			pointLabelYOffset="-15px"
			colors="#ACDADF"
			axisBottom={{
				tickSize: 0, tickPadding: 10, tickRotation: 0,
			}}
			axisLeft={{
				orient         : 'left',
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
