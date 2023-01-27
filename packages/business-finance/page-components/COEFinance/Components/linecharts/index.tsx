import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

function MyResponsiveLines({ data }) {
	return (
		<ResponsiveLine
			data={[
            	{
            		id   : 'A',
            		data : [
            			{ x: '2019-01-11', y: 11 },
            			{ x: '2019-01-12', y: 20 },
            			{ x: '2019-01-13', y: 24 },
            			{ x: '2019-01-14', y: 25 },
            			{ x: '2019-01-15', y: 15 },
            			{ x: '2019-01-16', y: 50 },
            			{ x: '2019-01-17', y: 30 },
            			{ x: '2019-01-18', y: 31 },
					],
            	},
            	{
            		id   : 'B',
            		data : [
            			{ x: '2019-01-11', y: 30 },
            			{ x: '2019-01-12', y: 24 },
            			{ x: '2019-01-13', y: 22 },
            			{ x: '2019-01-14', y: 15 },
            			{ x: '2019-01-15', y: 35 },
            			{ x: '2019-01-16', y: 45 },
            			{ x: '2019-01-17', y: 20 },
            			{ x: '2019-01-18', y: 11 },
					],
            	},
			]}
			colors={{ scheme: 'set1' }}
			xScale={{ type: 'point' }}
			yScale={{
            	type    : 'linear',
            	stacked : false,
			}}
			enablePointLabel
			enableGridX={false}
			axisLeft={null}
			axisBottom={{
            	tickSize       : 0,
            	legend         : 'Date',
            	legendOffset   : 36,
            	legendPosition : 'middle',
            	tickValues     : 0,
			}}
			curve="linear"
			enablePoints
			pointBorderWidth={1}
			useMesh
			enableSlices={false}
			margin={{ top: 40, right: 50, bottom: 60, left: 60 }}
			animate
		/>
	);
}
export default MyResponsiveLines;
