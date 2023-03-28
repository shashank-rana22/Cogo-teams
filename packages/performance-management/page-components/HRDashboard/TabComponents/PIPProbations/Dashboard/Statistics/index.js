import { ResponsiveBar } from '@cogoport/charts/bar';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import Filters from '../../../../../../common/Filters';

import styles from './styles.module.css';

function Statistics() {
	const barChartData = [
		{
			month            : 'January',
			employees_in_pip : 100,
			confirmed        : 60,
			exit             : 50,
		},
		{
			month            : 'February',
			employees_in_pip : 90,
			confirmed        : 45,
			exit             : 20,
		},
		{
			month            : 'March',
			employees_in_pip : 96,
			confirmed        : 34,
			exit             : 12,
		},
		{
			month            : 'April',
			employees_in_pip : 120,
			confirmed        : 67,
			exit             : 35,
		},
	];

	const loading = false;

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<Filters
					// params={params}
					// setParams={setParams}
					source="hr_pip_stats"
				/>
			</div>

			<div className={styles.chart_section}>

				<div className={styles.chart}>
					<div className={styles.chart_header}>PIP Statistics</div>
					{!loading && isEmpty(barChartData) ? (
						<EmptyState
							height={140}
							width={220}
							emptyText="PIP Statistics Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					) : (
						<ResponsiveBar
							data={barChartData}
							keys={[
								'employees_in_pip',
								'confirmed',
								'exit',
							]}
							indexBy="month"
							margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
							padding={0.3}
							groupMode="grouped"
							valueScale={{
								type: 'linear',
							}}
							colors={['#CFEAED', '#C4DC91', '#F37166']}
							axisTop={null}
							axisRight={null}
							axisBottom={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							axisLeft={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							enableGridY={false}
							borderRadius="6px"
							legends={[
								{
									dataFrom      : 'keys',
									anchor        : 'right',
									direction     : 'column',
									justify       : false,
									translateX    : 120,
									translateY    : 0,
									itemsSpacing  : 2,
									itemWidth     : 100,
									itemHeight    : 20,
									itemDirection : 'left-to-right',
									itemOpacity   : 0.85,
									symbolSize    : 10,
									effects       : [
										{
											on    : 'hover',
											style : {
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					)}
				</div>

				<div className={styles.chart}>
					<div className={styles.chart_header}>Probation Statistics</div>
					{!loading && isEmpty(barChartData) ? (
						<EmptyState
							height={140}
							width={220}
							emptyText="PIP Statistics Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					) : (
						<ResponsiveBar
							data={barChartData}
							keys={[
								'employees_in_pip',
								'confirmed',
								'exit',
							]}
							indexBy="month"
							margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
							padding={0.3}
							groupMode="grouped"
							valueScale={{
								type: 'linear',
							}}
							colors={['#CFEAED', '#C4DC91', '#F37166']}
							axisTop={null}
							axisRight={null}
							axisBottom={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							axisLeft={{
								tickSize     : 5,
								tickPadding  : 5,
								tickRotation : 0,
							}}
							enableGridY={false}
							borderRadius="6px"
							legends={[
								{
									dataFrom      : 'keys',
									anchor        : 'right',
									direction     : 'column',
									justify       : false,
									translateX    : 120,
									translateY    : 0,
									itemsSpacing  : 2,
									itemWidth     : 100,
									itemHeight    : 20,
									itemDirection : 'left-to-right',
									itemOpacity   : 0.85,
									symbolSize    : 10,
									effects       : [
										{
											on    : 'hover',
											style : {
												itemOpacity: 1,
											},
										},
									],
								},
							]}
						/>
					)}
				</div>
			</div>

		</div>
	);
}

export default Statistics;
