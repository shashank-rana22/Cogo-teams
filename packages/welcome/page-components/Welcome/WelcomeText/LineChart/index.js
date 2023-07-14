import { ResponsiveLine } from '@cogoport/charts/line';

import data from './data.json';

function MyResponsiveLine() {
	return (
		<ResponsiveLine
			data={data}
			margin={{ top: 40, right: 40, bottom: 50, left: 30 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat=" >-.2f"
			curve="cardinal"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient       : 'bottom',
				tickSize     : 5,
				tickPadding  : 5,
				tickRotation : 0,
			}}
			axisLeft={{
				orient       : 'left',
				tickSize     : 5,
				tickPadding  : 5,
				tickRotation : 0,
			}}
			gridYValues={[0]}
			gridXValues={[0]}
			enablePoints={false}
			pointSize={10}
			pointColor={{ theme: 'background' }}
			pointBorderColor={{ from: 'serieColor' }}
			pointLabelYOffset={0}
			enableCrosshair={false}
			useMesh
			legends={[
				{
					anchor        : 'top-left',
					direction     : 'row',
					justify       : false,
					translateX    : -30,
					translateY    : -30,
					itemWidth     : 100,
					itemHeight    : 20,
					itemsSpacing  : 4,
					symbolSize    : 15,
					symbolShape   : 'square',
					itemDirection : 'left-to-right',
					itemTextColor : '#777',
					itemTextFont  : '20',
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

export default MyResponsiveLine;
