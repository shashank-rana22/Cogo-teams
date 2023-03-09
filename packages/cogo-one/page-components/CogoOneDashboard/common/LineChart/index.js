/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveLine } from '@cogoport/charts/line';
import React from 'react';

import { LABLE_TYPE } from '../../configurations/dashboard';
import chartData from '../../configurations/line-chart-data';

import LineChartLoader from './LoaderLineChart';
import styles from './styles.module.css';

function LineChart({ cogoOneDashboardGraph = {}, timeline = '', loading = false }) {
	const { graph_stats = {} } = cogoOneDashboardGraph || {};
	const GraphData = chartData({ cogoOneDashboardGraph, timeline }) || [];

	return (
		<div className={styles.main_container}>
			<div className={styles.chart_legends_box}>
				<div className={styles.legend}>
					<div className={styles.legend_left_box}>
						<div className={`${styles.color_dot} ${styles.grey_color}`} />
						<div className={styles.legend_text}>
							On Message
						</div>
					</div>
					<div className={styles.users_nos}>
						{graph_stats?.on_message_users || 0}
						<span>Users</span>
					</div>
				</div>
				<div className={styles.legend}>
					<div className={styles.legend_left_box}>
						<div className={`${styles.color_dot} ${styles.orange_color}`} />
						<div className={styles.legend_text}>On Call</div>
					</div>
					<div className={styles.users_nos}>
						{graph_stats?.on_call_users || 0}
						<span>Users</span>
					</div>
				</div>

			</div>

			{loading
				? <LineChartLoader />
				: (

					<div className={styles.chart_container}>
						<ResponsiveLine
							data={GraphData}
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
								legend         : LABLE_TYPE[timeline].label,
								legendOffset   : 36,
								legendPosition : 'middle',
							}}
							axisLeft={{
								orient         : 'left',
								tickSize       : 5,
								tickValues     : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legend         : 'Customers',
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
							tooltip={({ point }) => (
								<div className={styles.tooltip_box}>
									<div className={styles.tooltip_text}>
										<div className={styles.column}>
											<div>
												Customers
											</div>
											<div>
												{LABLE_TYPE[timeline].label}
											</div>
										</div>
										<div className={`${styles.column} ${styles.column_center} `}>
											<div>
												:
											</div>
											<div>
												:
											</div>
										</div>

										<div className={styles.column}>
											<div>
												{point.data.y || 0}
											</div>
											<div>
												{point.data.x || 0}
											</div>
										</div>
									</div>
								</div>
							)}
						/>
					</div>
				)}
		</div>
	);
}
export default LineChart;
