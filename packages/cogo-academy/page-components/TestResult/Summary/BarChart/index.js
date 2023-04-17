import { ResponsiveBar } from '@cogoport/charts/bar';

import styles from './styles.module.css';

function BarChart({ chart_data = [], yAxis = '' }) {
	return (
		<div className={styles.bar_chart}>
			<ResponsiveBar
				data={chart_data}
				keys={[
					'percentile',
				]}
				indexBy="label"
				margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={{ datum: 'data.color' }}
				defs={[
					{
						id         : 'dots',
						type       : 'patternDots',
						background : 'inherit',
						color      : '#38bcb2',
						size       : 4,
						padding    : 1,
						stagger    : true,
					},
					{
						id         : 'lines',
						type       : 'patternLines',
						background : 'inherit',
						color      : '#eed312',
						rotation   : -45,
						lineWidth  : 6,
						spacing    : 10,
					},
				]}
				borderRadius={0}
				borderColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							1.6,
						],
					],
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize       : 5,
					tickPadding    : 5,
					tickRotation   : 45,
					legendPosition : 'middle',
					legendOffset   : 32,
				}}
				maxValue={100}
				axisLeft={{
					tickSize       : 5,
					tickValues     : [0, 100],
					tickPadding    : 5,
					tickRotation   : 0,
					borderColor    : 'red',
					legend         : `${yAxis || 'Percentile'}`,
					legendPosition : 'middle',
					legendOffset   : -40,
				}}
				gridYValues={[0]}
				gridXValues={[0]}
				enableLabel={false}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							1.6,
						],
					],
				}}
				role="application"
			/>
		</div>
	);
}
export default BarChart;
