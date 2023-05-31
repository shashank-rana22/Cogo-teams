import { ResponsiveLine } from '@cogoport/charts/line';

function Graph({ data }) {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient         : 'bottom',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'transportation',
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				orient         : 'left',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'count',
				legendOffset   : -40,
				legendPosition : 'middle',
			}}
			colors={{ scheme: 'nivo' }}
			lineWidth={3}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			crosshairType="x"
			useMesh
			legends={[
				{
					anchor        : 'top-left',
					direction     : 'row',
					justify       : false,
					translateX    : 0,
					translateY    : -37,
					itemWidth     : 100,
					itemHeight    : 20,
					itemsSpacing  : 0,
					symbolSize    : 18,
					symbolShape   : 'circle',
					itemDirection : 'left-to-right',
					itemTextColor : '#777',
					effects       : [
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

export default Graph;
