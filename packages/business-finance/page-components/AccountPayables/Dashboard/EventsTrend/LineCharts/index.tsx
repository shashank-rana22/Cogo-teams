import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

import styles from './styles.module.css';

const data = [
	{
		id: '19 may', value: 2,
	},
	{
		id: '20 may', value: 20,
	},
	{
		id: '21 may', value: 17,
	},
	{
		id: '22 may', value: 20,
	},
	{
		id: '23 may', value: 15,
	},
	{
		id: '24 may', value: 11,
	},
	{
		id: '25 may', value: 19,
	},
	{
		id: '26 may', value: 5,
	},
	{
		id: '27 may', value: 13,
	},
	{
		id: '28 may', value: 5,
	},
];
const sales = data || [];
function LineCharts() {
	const config = {
		mapping : [{ label: 'Count', key: 'id', value: 'value' }],
		data    : [sales],
		color   : ['#B3E2BB'],
	};
	const { data: configdata = [], mapping = [] } = config;
	const bardata = (configdata || []).map((item, index) => ({
		id   : mapping[index]?.label,
		data : item?.map((value) => ({
			x : value?.[mapping[index]?.key] || '',
			y : `${Number(value?.[mapping[index]?.value])}` || 0,
		})),
	}));
	return (
		<div className={styles.line}>
			<ResponsiveLine
				data={bardata}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'point' }}
				enableGridX={false}
				enableSlices="x"
				yScale={{
					type    : 'linear',
					// min     : 'auto',
					max     : 40,
					stacked : true,
					reverse : false,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					// orient         : 'bottom',
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					// legend         : 'transportation',
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				axisLeft={{
					// orient         : 'left',
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					// legend         : 'count',
					legendOffset   : -40,
					legendPosition : 'middle',
				}}
				pointSize={10}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh
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

		</div>
	);
}

export default LineCharts;
