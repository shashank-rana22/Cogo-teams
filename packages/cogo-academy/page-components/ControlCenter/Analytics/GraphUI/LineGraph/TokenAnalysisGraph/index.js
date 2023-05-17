import { ResponsiveLine } from '@cogoport/charts/line';
import { format } from '@cogoport/utils';
import { useEffect } from 'react';

function TokenAnalysisGraph({ graphData, setShowTotalCost }) {
	useEffect(() => {
		setShowTotalCost(true);
	}, [setShowTotalCost]);

	const theme = {
		legends: {
			text: {
				fontSize: 13,
			},
		},
	};
	return (
		<ResponsiveLine
			data={graphData}
			theme={theme}
			margin={{
				right  : 10,
				top    : 50,
				bottom : 50,
				left   : 60,
			}}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : false,
				reverse : false,
			}}
			colors={{ datum: 'color' }}
			curve="monotoneX"
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient         : 'bottom',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 30,
				legendOffset   : 36,
				legendPosition : 'middle',
				format(value) {
					return format(value, 'dd/MM, HH:mm');
				},
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
			pointSize={6}
			pointColor="white"
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-14}
			useMesh
			legends={[
				{
					anchor            : 'upper-left',
					direction         : 'row',
					justify           : false,
					translateX        : -6,
					translateY        : 0,
					itemsSpacing      : 40,
					itemDirection     : 'left-to-right',
					itemWidth         : 120,
					itemHeight        : -40,
					itemOpacity       : 0.75,
					symbolSize        : 12,
					symbolShape       : 'circle',
					symbolBorderColor : 'rgba(0, 0, 0, .5)',

					effects: [
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

export default TokenAnalysisGraph;
