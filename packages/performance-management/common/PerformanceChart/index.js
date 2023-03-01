import { ResponsiveLine } from '@cogoport/charts/line';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetFeedbackPerformanceStats from '../../hooks/useGetFeedbackPerformanceStats';
import EmptyState from '../EmptyState';
import TeamPieChart from '../TeamPieChart';

import styles from './styles.module.css';

function PerformanceChart({ params = {}, userId = '' }) {
	const {
		performanceStatsList = [],
		loading,
	} = useGetFeedbackPerformanceStats({ userId, params });

	const lineChartlist = [];

	(performanceStatsList || []).forEach((stat) => {
		const { month = '', rating = '' } = stat || {};
		lineChartlist.push({ x: month, y: rating });
	});

	const lineChartData = [{ id: 'x', data: lineChartlist }];

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>
					Performance Chart
				</p>
			</div>

			<div className={styles.chart_section}>

				<div className={styles.line_graph}>
					{!loading && isEmpty(lineChartlist) ? (
						<EmptyState
							height={140}
							width={220}
							emptyText="Yearly Graph Stats Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					) : (
						<ResponsiveLine
							data={lineChartData}
							margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
							xScale={{
								type    : 'point',
								stacked : true,
								min     : 0,
								max     : 12,
							}}
							yScale={{
								type     : 'linear',
								tickSize : 5,
								min      : 1,
								max      : 5,
								reverse  : false,
								stacked  : false,
							}}
							yFormat=" >-.2f"
							curve="natural"
							lineWidth={3}
							axisTop={null}
							axisRight={null}
							axisBottom={{
								orient         : 'bottom',
								tickSize       : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legend         : 'Months',
								legendOffset   : 36,
								legendPosition : 'middle',
							}}
							axisLeft={{
								orient         : 'left',
								tickValues     : 5,
								tickSize       : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legend         : 'KPI',
								legendOffset   : -40,
								legendPosition : 'middle',
							}}
							enableGridX={false}
							pointSize={8}
							pointBorderWidth={7}
							pointLabelYOffset={-12}
							areaOpacity={0.5}
							useMesh
							colors={['#F2E3C3', '#F9AE64', '#828282']}
							colorBy="index"
						/>
					)}
				</div>

				<div className={styles.pie_chart}>
					<TeamPieChart userId={userId} params={params} />
				</div>
			</div>

		</div>
	);
}

export default PerformanceChart;
