import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

function LineChart({ data = [] }) {
	const formattedData = (data || []).map((val) => ({
		x : val.duration,
		y : val.dso,
	}));

	const finalData = [{ id: 'dso', data: formattedData }];

	return (
		<ResponsiveLine
			data={finalData}
			margin={{
				top    : 50,
				right  : 100,
				bottom : 50,
				left   : 80,
			}}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 0,
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			min={0}
			colors={['#EE3425']}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient         : 'bottom',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Duration',
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				orient         : 'left',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Days',
				legendOffset   : -50,
				legendPosition : 'middle',
			}}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
		/>
	);
}

export default LineChart;
