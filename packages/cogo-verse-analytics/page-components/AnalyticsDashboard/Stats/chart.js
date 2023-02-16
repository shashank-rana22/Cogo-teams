/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveLine } from '@nivo/line';

import { CHART_DATA } from '../../../configurations/chart-data';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function Charts() {
	return (
		<ResponsiveLine
			data={CHART_DATA}
			margin={{ top: 10, right: 20, bottom: 50, left: 65 }}
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
        	orient         : 'bottom',
        	tickSize       : 0,
        	tickPadding    : 20,
        	tickRotation   : 0,
        	legend         : '',
        	legendOffset   : 36,
        	legendPosition : 'middle',
			}}
			axisLeft={{
        	orient         : 'left',
        	tickSize       : 0,
        	tickPadding    : 20,
        	tickRotation   : 0,
        	legend         : '',
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
			crosshairType="bottom"
			useMesh
			legends={[]}
		/>
	);
}

export default Charts;
