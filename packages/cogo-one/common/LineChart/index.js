/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

import { DateChartDummyData } from '../../configurations/dummyDateData';

import styles from './styles.module.css';

function LineChart() {
	return (
		<div className={styles.main_container}>
			<ResponsiveLine
				data={DateChartDummyData}
				margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
				xScale={{ type: 'point' }}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					orient         : 'bottom',
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					// legend         : 'transportation',
					legendOffset   : 36,
					legendPosition : 'middle',
				}}
				axisLeft={{
					orient         : 'left',
					tickSize       : 5,
					tickValues     : 5,
					tickPadding    : 5,
					tickRotation   : 0,
					// legend         : 'count',
					legendOffset   : -40,
					legendPosition : 'middle',
				}}
				colors={['#C4C4C4', '#F98600']}
				enableGridX={false}
				pointSize={4}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={4}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh
				legends={[
					{
						anchor            : 'bottom-right',
						direction         : 'row',
						justify           : false,
						translateX        : -650,
						translateY        : -210,
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
export default LineChart;
