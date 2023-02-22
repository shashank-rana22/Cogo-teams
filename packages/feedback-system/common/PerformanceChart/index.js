import { ResponsiveLine } from '@cogoport/charts/line';
import { Placeholder } from '@cogoport/components';
import React from 'react';

import useGetFeedbackPerformanceStats from '../../hooks/useGetFeedbackPerformanceStats';
import TeamPieChart from '../TeamPieChart';

import EmptyState from './EmptyState';
import styles from './styles.module.css';

function PerformanceChart({ params = {}, userId = ''}) {
	const { Month = '', Year = '', ManagerID = '' } = params;

	const {
		performanceStatsList = [],
		loading,
	} = useGetFeedbackPerformanceStats({ userId, Month, Year, ManagerID });

	const lineChartlist = [];

	(performanceStatsList || []).forEach((stat) => {
		const { month = '', rating = '' } = stat || {};
		lineChartlist.push({ x: month, y: rating });
	});

	const lineChartData = [{ id: 'x', data: lineChartlist }];

	const showLoading = () => (
		<div style={{ margin: '16px', display: 'flex', flexDirection: 'row' }}>

			<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
				<Placeholder style={{ marginBottom: '16px' }} width="80%" height="80px" />
				<Placeholder style={{ marginBottom: '16px' }} width="80%" height="80px" />
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginBottom: '40px' }}>
				<Placeholder
					style={{
						marginBottom : '16px',
						borderRadius : '50%',
						display      : 'flex',
						marginLeft   : 'auto',
						marginRight  : 'auto',
					}}
					width="30%"
					height="160px"
				/>
				<Placeholder
					style={{
						marginBottom : '32px',
						marginLeft   : '20%',
					}}
					width="16%"
					height="40px"
				/>
			</div>

		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>
					Performance Chart
				</p>
			</div>

			{loading ? showLoading() : (
				<div className={styles.chart_section}>
					{(!loading && lineChartlist?.length) > 0 ? (
						<div className={styles.line_graph}>
							<ResponsiveLine
								data={lineChartData}
								margin={{ top: 30, right: 110, bottom: 50, left: 60 }}
								xScale={{
									type    : 'point',
									stacked : true,
									min     : 0,
									max     : 12,
								}}
								yScale={{
									type     : 'linear',
									tickSize : 5,
									min      : 0,
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
						</div>

					) : (
						<div className={styles.empty_container}>
							<EmptyState
								height={140}
								width={180}
								emptyText="Performance Stats Not Found"
								textSize="12px"
								flexDirection="column"
							/>
						</div>
					)}

					<div className={styles.pie_chart}>
						<TeamPieChart userId={userId} month={Month} year={Year} />
					</div>

				</div>
			)}
		</div>
	);
}

export default PerformanceChart;
