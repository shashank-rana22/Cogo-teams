import { ResponsiveLine } from '@cogoport/charts/line';
import { Select, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetFeedbackPerformanceStats from '../../hooks/useGetFeedbackPerformanceStats';
import TeamPieChart from '../TeamPieChart';

import EmptyState from './EmptyState';
import { getMonthControls } from './getMonthControls';
import styles from './styles.module.css';

const PieData = [
	{
		id    : 'java',
		label : 'java',
		value : 195,
	},
	{
		id    : 'erlang',
		label : 'erlang',
		value : 419,
	},
	{
		id    : 'go',
		label : 'go',
		value : 71,
	},
	{
		id    : 'solidity',
		label : 'solidity',
		value : 31,
	},
];

function PerformanceChart({ user_id = '' }) {
	const { placeholder, options } = getMonthControls;

	const {
		performanceStatsData = {},
		loading,
		performanceFilter,
		setPerformanceFilter = () => { },
	} = useGetFeedbackPerformanceStats({ user_id });

	const lineData1 = ['_',
	];

	Object.keys(performanceStatsData).map((key) => {
		const { month = '', rating = '' } = performanceStatsData[key] || {};
		lineData1.push({ x: month, y: rating });

		return null;
	});

	const newlineData = [
		{
			id   : 'japan',
			data : [
				{
					x : 'Jan',
					y : 10,
				},
				{
					x : 'Feb',
					y : 101,
				},
				{
					x : 'Mar',
					y : 231,
				},
			],
		},
		{
			id   : 'russia',
			data : [
				{
					x : 'Jan',
					y : 198,
				},
				{
					x : 'Feb',
					y : 24,
				},
				{
					x : 'Mar',
					y : 231,
				},
			],
		},
		{
			id   : 'us',
			data : [
				{
					x : 'Jan',
					y : 30,
				},
				{
					x : 'Feb',
					y : 120,
				},
				{
					x : 'Mar',
					y : 201,
				},
			],
		},
	];

	const showLoading = () => (
		<div style={{ margin: '16px', display: 'flex', flexDirection: 'row' }}>

			<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
				<Placeholder style={{ marginBottom: '16px' }} width="80%" height="80px" />
				<Placeholder style={{ marginBottom: '16px' }} width="80%" height="80px" />
			</div>

			{/* <Placeholder
				style={{ marginBottom: '16px', borderRadius: '50%/50%', marginRight: '3%' }}
				width="25%"
				height="160px"
			/>
			<Placeholder style={{ marginBottom: '16px', borderRadius: '50%/50%' }} width="25%" height="160px" /> */}
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

			{isEmpty(lineData1) && !loading && (
				<div className={styles.empty_container}>
					<EmptyState
						height={140}
						width={220}
						emptyText="Performance Stats Not Found"
						textSize="12px"
						flexDirection="column"
					/>
				</div>
			)}

			{!loading && lineData1?.length > 0
			&& (
				<div className={styles.chart_section}>
					<div className={styles.line_graph}>
						<ResponsiveLine
							data={newlineData}
							margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
							curve="natural"
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
								tickSize       : 5,
								tickPadding    : 5,
								tickRotation   : 0,
								legend         : 'Hours',
								legendOffset   : -40,
								legendPosition : 'middle',
							}}
							enableGridX={false}
							enableGridY={false}
							enablePoints={false}
							pointColor={{ theme: 'background' }}
							pointBorderWidth={2}
							pointLabelYOffset={-12}
							areaOpacity={0.25}
							enableCrosshair={false}
							crosshairType="top-left"
							useMesh
							colors={['#F2E3C3', '#F9AE64', '#828282', '#FDE74D']}
							colorBy="index"
							legends={[
								{
									anchor        : 'top-right',
									direction     : 'row',
									justify       : false,
									translateX    : 0,
									translateY    : 0,
									itemWidth     : 100,
									itemHeight    : 20,
									itemsSpacing  : 4,
									symbolSize    : 20,
									symbolShape   : 'circle',
									itemDirection : 'left-to-right',
									itemTextColor : '#777',
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

					</div>

					<div className={styles.pie_chart}>
						<TeamPieChart data={PieData} />
					</div>
					<div className={styles.pie_chart}>
						<TeamPieChart data={PieData} />
					</div>
				</div>
			)}
		</div>
	);
}

export default PerformanceChart;
