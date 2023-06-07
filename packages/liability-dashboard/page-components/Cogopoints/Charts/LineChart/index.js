import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

function LineChart() {
	const data = [
		{
			id    : 'earned',
			color : 'hsl(155, 70%, 50%)',
			data  : [
				{
					x : '2',
					y : 134,
				},
				{
					x : '8',
					y : 273,
				},
				{
					x : 'boat',
					y : 13,
				},
				{
					x : 'train',
					y : 115,
				},
				{
					x : 'subway',
					y : 201,
				},
				{
					x : 'bus',
					y : 274,
				},

			],
		},
		{
			id    : 'estimated',
			color : 'hsl(8, 70%, 50%)',
			data  : [
				{
					x : '2',
					y : 137,
				},
				{
					x : '8',
					y : 221,
				},
				{
					x : 'boat',
					y : 69,
				},
				{
					x : 'train',
					y : 103,
				},
				{
					x : 'subway',
					y : 244,
				},

			],
		},
	];
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 10, right: 40, bottom: 45, left: 60 }}
			xScale={{ type: 'point' }}
			xFormat=" >-"
			yScale={{
				type    : 'linear',
				min     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'transportation',
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'count',
				legendOffset   : -40,
				legendPosition : 'middle',
			}}
			enableGridX={false}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
			legends={[]}
		/>
	);
}

export default LineChart;
