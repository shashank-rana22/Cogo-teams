import { ResponsivePie } from '@cogoport/charts/pie';
import { Placeholder } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';

import styles from './styles.module.css';

interface ChartDataInterface{
	expenseBookedSum?: number
	expenseAccruedSum?: number
	expenseCurrency?: string
	incomeBookedSum?: number
	incomeAccruedSum?: number
	incomeCurrency?: string
	statsLoading?: boolean
	COLORS?: Array<string>
	data?: Array<object>
	dataExpense?: Array<object>
}
function ChartData({
	expenseBookedSum, expenseAccruedSum, expenseCurrency, incomeBookedSum, incomeAccruedSum,
	incomeCurrency, statsLoading, COLORS, data, dataExpense,
}:ChartDataInterface) {
	function CenteredMetric({ centerX, centerY }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize   : '12px',
					fontWeight : 600,

				}}
			>
				Income
			</text>

		);
	}

	function CenteredMetricExpense({ centerX, centerY }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize   : '12px',
					fontWeight : 600,

				}}
			>
				Expense
			</text>

		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.income_pie_chart}>
				<ResponsivePie
					data={data}
					margin={{ top: 0, right: 0, bottom: 25, left: 10 }}
					innerRadius={0.7}
					colors={COLORS}
					padAngle={1}
					enableArcLabels={false}
					enableArcLinkLabels={false}
					isInteractive
					activeOuterRadiusOffset={4}
					layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
				/>
			</div>

			<div className={styles.income_data}>
				<div className={styles.booked_data}>
					Booked Income
					<div className={styles.amount_data}>
						{ statsLoading ? <Placeholder height="20px" width="80px" />
							: getFormattedPrice(incomeBookedSum, incomeCurrency) || 0.00}
					</div>
				</div>

				<div>
					Accrued Income
					<div className={styles.amount_data}>
						{statsLoading ? <Placeholder height="20px" width="80px" />
							: getFormattedPrice(incomeAccruedSum, incomeCurrency) || 0.00}
					</div>
				</div>

			</div>

			<div className={styles.income_pie_chart}>
				<ResponsivePie
					data={dataExpense}
					margin={{ top: 0, right: 0, bottom: 25, left: 10 }}
					innerRadius={0.7}
					colors={COLORS}
					padAngle={1}
					enableArcLabels={false}
					enableArcLinkLabels={false}
					isInteractive
					activeOuterRadiusOffset={4}
					layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetricExpense]}
				/>
			</div>

			<div className={styles.income_data}>
				<div className={styles.booked_data}>
					Booked Expense
					<div className={styles.amount_data}>
						{ statsLoading ? <Placeholder height="20px" width="80px" />
							: getFormattedPrice(expenseBookedSum, expenseCurrency) || 0.00}
					</div>
				</div>

				<div>
					Accrued Expense
					<div className={styles.amount_data}>
						{ statsLoading ? <Placeholder height="20px" width="80px" />
							: getFormattedPrice(expenseAccruedSum, expenseCurrency) || 0.00}
					</div>
				</div>

			</div>
		</div>
	);
}
export default ChartData;
