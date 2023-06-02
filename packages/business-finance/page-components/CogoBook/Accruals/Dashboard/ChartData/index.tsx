import { ResponsivePie } from '@cogoport/charts/pie';

import styles from './styles.module.css';

const colors = ['#57C6D1', '#ADCC6A'];

const data = [
	{
		id    : 'Income Accrued',
		label : 'Income Accrued',
		value : 12,
		color : '#57C6D1',
	},
	{
		id    : 'Income Booked',
		label : 'Income Booked',
		value : 12,
		color : '#ADCC6A',
	},
];

const dataExpense = [
	{
		id    : 'Expense Accrued',
		label : 'Expense Accrued',
		value : 12,
		color : '#57C6D1',
	},
	{
		id    : 'Expense Booked',
		label : 'Expense Booked',
		value : 12,
		color : '#ADCC6A',
	},
];

function ChartData() {
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
	return (
		<div className={styles.container}>
			<div className={styles.income_pie_chart}>
				<ResponsivePie
					data={data}
					margin={{ top: 0, right: 0, bottom: 25, left: 10 }}
					innerRadius={0.7}
					colors={colors}
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
						INR 60,30,00,000
					</div>
				</div>

				<div>
					Accrued Income
					<div className={styles.amount_data}>
						INR 60,30,00,000
					</div>
				</div>

			</div>

			<div className={styles.income_pie_chart}>
				<ResponsivePie
					data={dataExpense}
					margin={{ top: 0, right: 0, bottom: 25, left: 10 }}
					innerRadius={0.7}
					colors={colors}
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
					Booked Expense
					<div className={styles.amount_data}>
						INR 60,30,00,000
					</div>
				</div>

				<div>
					Accrued Expense
					<div className={styles.amount_data}>
						INR 60,30,00,000
					</div>
				</div>

			</div>
		</div>
	);
}
export default ChartData;
