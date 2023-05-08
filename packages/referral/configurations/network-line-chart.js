import { ResponsiveLine } from '@cogoport/charts/line';

function NetworkLineChart() {
	const data = [
		{
			id   : 'network',
			data : [
				{
					x : 'L1',
					y : 0,
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
					y : '500',
				},
				{
					x : 'L60',
					y : '3000',
				},
			],
		},
	];
	return (
		<ResponsiveLine
			data={data}
			width={320}
			height={170}
			colors={['#F9AE64']}
			margin={{ top: 5, right: 10, bottom: 50, left: 50 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : false,
				reverse : false,
			}}
			curve="natural"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 0,
				tickPadding    : 10,
				tickRotation   : 0,
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 0,
				tickPadding    : 10,
				tickValues     : 5,
				tickRotation   : 0,
				legend         : 'users  >',
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

		/>
	);
}
export default NetworkLineChart;
