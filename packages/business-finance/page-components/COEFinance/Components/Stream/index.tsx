import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsiveLine({ data }) {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 50, right: 45, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			enableGridX={false}
			colors={['#F9DA7F']}
			enableArea
            // areaOpacity={1}
			enablePointLabel
			enableSlices={false}
			crosshairType="cross"
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
				// orient: 'bottom',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Dates',
				legendOffset   : 36,
				legendPosition : 'middle',
			}}
			axisLeft={{
				// orient: 'left',
				tickSize       : 5,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Rates',
				legendOffset   : -40,
				legendPosition : 'middle',
			}}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={-12}
			useMesh
			legends={[
				{
					anchor            : 'bottom-right',
					direction         : 'column',
					justify           : false,
					translateX        : 60,
					translateY        : -280,
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
export default MyResponsiveLine;
