import { ResponsiveLine } from '@cogoport/charts/line';
import { Select, Placeholder, Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import React from 'react';

import useGetFeedbackPerformanceStats from '../../hooks/useGetFeedbackPerformanceStats';

import EmptyState from './EmptyState';
import { getMonthControls } from './getMonthControls';
import styles from './styles.module.css';

function PerformanceChart() {
	const { placeholder, options } = getMonthControls;

	const {
		performanceStatsData = {},
		loading,
		performanceFilter,
		setPerformanceFilter = () => {},
	} = useGetFeedbackPerformanceStats();

	const lineData1 = [];

	Object.keys(performanceStatsData).map((key) => {
		const { month = '', rating = '' } = performanceStatsData[key] || {};
		lineData1.push({ x: month, y: rating });

		return null;
	});

	const newlineData = [
		{
			id    : 'KPI',
			color : 'hsl(81, 70%, 50%)',
			data  : lineData1,
		},
	];

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			{' '}
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
			<Placeholder style={{ marginBottom: '16px' }} width="100%" height="80px" />
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>
					Performance Chart
				</p>

				<Select
					placeholder={placeholder}
					options={options}
					value={performanceFilter}
					onChange={setPerformanceFilter}
				/>
			</div>
			{loading && showLoading()}

			{lineData1?.length === 0 && !loading && <EmptyState />}

			{!loading && lineData1?.length > 0 && (
				<div style={{ height: '300px' }}>
					<ResponsiveLine
						data={newlineData}
						margin={{
							top    : 20,
							right  : 120,
							bottom : 90,
							left   : 60,
						}}
						xScale={{
							type    : 'point',
							stacked : true,
							min     : 0,
							max     : 5,
						}}
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
							orient         : 'bottom',
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Month',
							legendOffset   : 36,
							legendPosition : 'middle',
						}}
						axisLeft={{
							orient         : 'left',
							tickValues     : [1, 2, 3, 4, 5],
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Rating',
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
			)}
		</div>
	);
}

export default PerformanceChart;
