/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

import { DateChartDummyData } from '../../configurations/dummyDateData';

import styles from './styles.module.css';

function LineChart() {
	return (
		<div className={styles.main_container}>
			<div className={styles.chart_legends_box}>
				<div className={styles.legend}>
					<div className={styles.legend_left_box}>
						<div className={`${styles.color_dot} ${styles.grey_color}`} />
						<div className={styles.legend_text}>On Message</div>
					</div>
					<div className={styles.users_nos}>30 Users</div>
				</div>
				<div className={styles.legend}>
					<div className={styles.legend_left_box}>
						<div className={`${styles.color_dot} ${styles.orange_color}`} />
						<div className={styles.legend_text}>On Call</div>
					</div>
					<div className={styles.users_nos}>20 Users</div>
				</div>

			</div>
			<div className={styles.chart_container}>
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
				/>
			</div>
		</div>
	);
}
export default LineChart;
