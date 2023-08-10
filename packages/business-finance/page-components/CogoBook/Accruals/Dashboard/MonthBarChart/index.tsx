import { ResponsiveBar } from '@cogoport/charts/bar';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

export interface BarDatum {
	[key: string]: string | number;
}
interface MonthlyBarChartInterface {
	monthlyData?: Array<BarDatum>
}
function MonthBarChart({ monthlyData }:MonthlyBarChartInterface) {
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
				colors={['#ADCC6A', '#57C6D1']}
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
					format       : (value) => `${formatAmount({
						amount   : value,
						currency : GLOBAL_CONSTANTS.currency_code?.INR,
						options  : {
							currencyDisplay : 'code',
							style           : 'currency',
							notation        : 'compact',
							compactDisplay  : 'short',
						},
					})}`,
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
									{bar?.data?.value ? formatAmount({
										amount  : bar?.data?.value.toString(),
										options : {
											currencyDisplay : 'code',
											style           : 'decimal',
											notation        : 'compact',
											compactDisplay  : 'short',
										},
									}) : null}
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
