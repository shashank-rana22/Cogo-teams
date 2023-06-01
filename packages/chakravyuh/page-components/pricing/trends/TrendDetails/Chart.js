import { ResponsiveLine } from '@cogoport/charts/line';

function TrendsChart({ data }) {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 30, right: 100, bottom: 100, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			colors={{ scheme: 'dark2' }}
			yFormat=" >-.4f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 90,
				legend         : '',
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Amount In USD',
				legendOffset   : -50,
				legendPosition : 'middle',
			}}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
			enableSlices="x"
			legends={[
				{
					anchor            : 'bottom-right',
					direction         : 'column',
					justify           : false,
					translateX        : 100,
					translateY        : 0,
					itemsSpacing      : 0,
					itemDirection     : 'left-to-right',
					itemWidth         : 80,
					itemHeight        : 20,
					itemOpacity       : 0.75,
					symbolSize        : 12,
					symbolShape       : 'circle',
					symbolBorderColor : 'rgba(0, 0, 0, .5)',
					effects           : [
						{
							on    : 'hover',
							style : {
								itemBackground : 'rgba(0, 0, 0, .03)',
								itemOpacity    : 1,
							},
						},
					],
				},
			]}
		/>
	);
}

export default TrendsChart;
