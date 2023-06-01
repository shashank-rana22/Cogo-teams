import { Popover } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';

import styles from './styles.module.css';

function StatsNumericData() {
	const MappingData = [{
		id    : '1',
		value : '430',
		label:
	<div>
		Shipment ID’S
		{' '}
		<br />
		{' '}
		Booked
	</div>,
	},
	{
		id    : '2',
		value : '430',
		label:
	<div>
		Shipment ID’S
		{' '}
		<br />
		{' '}
		Accrued
	</div>,
	}];

	const getRenderProfitData = [
		{ label: 'Booked Profit', amount: 'INR 2000' },
		{ label: 'Actual Profit ', amount: 'INR 2000' },
		{ label: 'Variance', amount: 'INR 2000' },
	];

	const getRenderVarianceData = [
		{ label: 'Expense Variation', amount: 'INR 2000', invoices: '12', color: '#EE3425' },
		{ label: 'Income Variation', amount: 'INR 2000', invoices: '12', color: '#849E4C' },
	];

	const contentProfit = (
		<div className={styles.profit}>
			{getRenderProfitData.map((val) => (
				<div key={val?.label}>
					<div className={styles.booked}>
						{val?.label}
						{' '}
					</div>
					<div className={styles.flex_data}>
						<span>Amount:</span>

						<div className={styles.amount}>
							{val?.amount}
						</div>
					</div>
				</div>
			))}
		</div>
	);

	const contentVariance = (
		<div className={styles.profit}>
			{getRenderVarianceData.map((val) => (
				<div key={val?.label}>
					<div className={styles.booked} style={{ color: val?.color }}>
						{val?.label}
						{' '}
					</div>

					<div className={styles.flex_data}>
						<span>Amount:</span>

						<div className={styles.amount}>
							{val?.amount}
						</div>
					</div>

					<div className={styles.flex_data}>
						<span>Invoices:</span>

						<div className={styles.amount}>
							{val?.invoices}
						</div>
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.numeric_data}>
				{MappingData.map((item) => (
					<div key={item?.id} className={styles.item}>
						<div className={styles.value_data}>{item?.value}</div>
						<div className={styles.label}>{item?.label}</div>
					</div>
				))}
			</div>
			<div className={styles.sorting_data}>
				<div className={styles.profit_bar}>
					{' '}
					Booked Profit :
					{' '}
					<span className={styles.percentage}>33.33% </span>
					{' '}
					| Actual Profit :
					{' '}
					<span className={styles.percentage}>
						{' '}
						25%
						{' '}
					</span>
					<Popover placement="bottom" render={contentProfit}>
						<div className={styles.icon_arrow}><IcMArrowRotateDown /></div>
					</Popover>
					{' '}
				</div>
				<div className={styles.profit_bar}>
					{' '}
					Avg. Variance :
					{' '}
					<span className={styles.percentage}> 33.33% </span>
					<Popover placement="bottom" render={contentVariance}>
						<div className={styles.icon_arrow}><IcMArrowRotateDown /></div>
					</Popover>
					{' '}
				</div>
			</div>
		</div>
	);
}
export default StatsNumericData;
