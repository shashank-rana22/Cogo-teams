import { ResponsiveLine } from '@cogoport/charts/line';

function NetworkLineChart() {
	const data = [
		{
			id    : 'network',
			color : '#F9AE64',
			data  : [
				{
					x : 'L1',
					y : 20,
				},
				{
					x : 'L10',
					y : 30,
				},
				{
					x : 'L20',
					y : 50,
				},
				{
					x : 'L30',
					y : 600,
				},
				{
					x : 'L40',
					y : 200,
				},
				{
					x : 'L50',
					y : 192,
				},
				{
					x : 'L60',
					y : 2000,
				},

			],
		},
	];
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat=" >-.2f"
			curve="natural"
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
			colors={{ scheme: 'nivo' }}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
			legends={[]}
			motionConfig={{
				mass      : 1,
				tension   : 170,
				friction  : 26,
				clamp     : false,
				precision : 0.01,
				velocity  : 0,
			}}
		/>
	);
}
export default NetworkLineChart;
