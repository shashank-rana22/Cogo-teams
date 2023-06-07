import { ResponsiveBar } from '@cogoport/charts/bar';

import { getAmountInLakhCrK } from './getAmountInLakhCrK';
import { getAmountLineChartInLakh } from './getAmountLineChartInLakh';
import styles from './styles.module.css';

function MonthBarChart({ monthlyData, COLORS }) {
	return (
		<div className={styles.container}>
			<ResponsiveBar
				data={monthlyData}
				keys={['Booked', 'Accrued']}
				indexBy="Month"
				margin={{ top: 100, right: 30, bottom: 80, left: 60 }}
				padding={0.8}
				enableLabel={false}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={COLORS}
				enableGridY
				layout="vertical"
				groupMode="grouped"
				axisTop={null}
				axisRight={null}
				innerPadding={10}
				axisBottom={{
					tickSize: 0, tickPadding: 20, tickRotation: 0,
				}}
				axisLeft={{
					tickSize     : 0,
					tickPadding  : -10,
					tickRotation : 0,
					format       : (value) => `${getAmountInLakhCrK(value, 'INR')}`,
				}}
				layers={['grid', 'axes', 'bars', 'markers', 'legends',
					({ bars }) => (
						<g>
							{bars.map((bar) => (
								<text
									key={bar.data.id}
									x={bar.x + bar.width / 2}
									y={bar.y + bar.height / 2}
									textAnchor="start"
									transform={`rotate(-90,${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
									style={{
										dominantBaseline : 'central',
										fontWeight       : '600',
										fontSize         : 12,
										fill             : '#333',
									}}
								>
									{getAmountLineChartInLakh(bar.data.value)}
								</text>
							))}
						</g>
					),
				]}
				role="application"
				animate
			/>
		</div>
	);
}
export default MonthBarChart;
