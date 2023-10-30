import { ResponsivePie } from '@cogoport/charts/pie';
import { Placeholder } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function ChartData({
	expenseBilledSum, expenseUnbilledSum, expenseCurrency, incomeBilledSum, incomeUnbilledSum,
	incomeCurrency, statsLoading, COLORS, data, dataExpense,
}) {
	function CenteredMetric({ centerX, centerY }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				className={styles.style_component_text}
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
				className={styles.style_component_text}
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
							: formatAmount({ amount: incomeBilledSum?.toString(), currency: incomeCurrency }) || 0.00}
					</div>
				</div>

				<div>
					Accrued Income
					<div className={styles.amount_data}>
						{statsLoading ? <Placeholder height="20px" width="80px" />
							: formatAmount({ amount: incomeUnbilledSum?.toString(), currency: incomeCurrency }) || 0.00}
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
							: formatAmount({ amount: expenseBilledSum?.toString(), currency: expenseCurrency }) || 0.00}
					</div>
				</div>

				<div>
					Accrued Expense
					<div className={styles.amount_data}>
						{ statsLoading ? <Placeholder height="20px" width="80px" />
							: formatAmount({
								amount   : expenseUnbilledSum?.toString(),
								currency : expenseCurrency,
							}) || 0.00}
					</div>
				</div>

			</div>
		</div>
	);
}
export default ChartData;
