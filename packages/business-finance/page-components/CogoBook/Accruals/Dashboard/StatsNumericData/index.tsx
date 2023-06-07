import { Placeholder, Popover } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMArrowRotateDown } from '@cogoport/icons-react';

import styles from './styles.module.css';

interface StatsDataInterface {
	bookedShipmentCount?: number
	accruedShipmentCount?: number
	bookedProfitPercentage?: number
	bookedProfit?: number
	actualProfit?: number
	actualProfitPercentage?: number
	variance?: number
	variancePercentage?: number
	varianceExpense?: number
	varianceIncome?: number
	expenseCurrency?: string
	varianceCurrency?: string
}
interface NumericInterface {
	statsData?:StatsDataInterface
	statsLoading?: boolean
}

function StatsNumericData({ statsData, statsLoading }:NumericInterface) {
	const {
		bookedShipmentCount = 0,
		accruedShipmentCount = 0,
		expenseCurrency,
		bookedProfitPercentage = 0,
		bookedProfit = 0,
		actualProfit = 0,
		actualProfitPercentage = 0,
		variance = 0,
		variancePercentage = 0,
		varianceExpense = 0,
		varianceIncome = 0,
		varianceCurrency,
	} = statsData;

	const MappingData = [{
		id    : '1',
		value : bookedShipmentCount,
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
		value : accruedShipmentCount,
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
		{ label: 'Booked Profit', amount: getFormattedPrice(bookedProfit, expenseCurrency) || 0.00 },
		{ label: 'Actual Profit ', amount: getFormattedPrice(actualProfit, expenseCurrency) || 0.00 },
		{ label: 'Variance', amount: getFormattedPrice(variance, expenseCurrency) || 0.00 },
	];

	const getRenderVarianceData = [
		{
			label  : 'Expense Variation',
			amount : getFormattedPrice(varianceExpense, varianceCurrency) || 0.00,
			color  : '#EE3425',
		},
		{
			label  : 'Income Variation',
			amount : getFormattedPrice(varianceIncome, varianceCurrency) || 0.00,
			color  : '#849E4C',
		},
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

				</div>
			))}
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.numeric_data}>
				{MappingData.map((item) => (
					<div key={item?.id} className={styles.item}>
						<div className={styles.value_data}>
							{statsLoading ? <Placeholder height="50px" width="40px" />
								: item?.value}

						</div>
						<div className={styles.label}>{item?.label}</div>
					</div>
				))}
			</div>
			<div className={styles.sorting_data}>
				<div className={styles.profit_bar}>
					{' '}
					Booked Profit :
					{' '}
					<span className={styles.percentage}>
						{ statsLoading
							? <Placeholder height="20px" width="40px" /> : `${bookedProfitPercentage.toFixed(2)} %`}

					</span>
					{' '}
					| Actual Profit :
					{' '}
					<span className={styles.percentage}>
						{' '}
						{ statsLoading
							? <Placeholder height="20px" width="40px" /> : `${actualProfitPercentage.toFixed(2)} %`}
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
					<span className={styles.percentage}>
						{' '}
						{ statsLoading
							? <Placeholder height="20px" width="40px" /> : `${variancePercentage.toFixed(2)} %`}
					</span>
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
