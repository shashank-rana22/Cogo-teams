import React from 'react';

import TabSelect from '../../../../../commons/TabSelect/index';
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface ItemProps {
	discount_amount?:number;
	discount_amount_currency?:string;
	discount_amount_revenue?:number;
	discount_amount_revenue_currency?:string;
	status?:string;
}
interface PropsType {
	itemData: ItemProps;
	amountTab: string;
	setAmountTab: Function;
}

function CardHeader({ amountTab, setAmountTab, itemData }: PropsType) {
	const {
		discount_amount:DiscountAmount, discount_amount_currency:DicountAmountCurrency,
		discount_amount_revenue:DiscountAmountRevenue,
		discount_amount_revenue_currency:DiscountAmountRevenueCurrency, status:Status,
	} = itemData || {};
	const options = [
		{ name: 'Expense', value: 'expense' },
		{ name: 'Income', value: 'income' },
	];
	return (
		<div className={styles.container}>
			<div className={styles.amount}>
				<div className={styles.toggle}>
					<TabSelect
						options={options}
						value={amountTab}
						setValue={setAmountTab}
					/>
				</div>
				<div className={styles.discount}>
					<div className={styles.label_text}>
						Discount Applied (KAM) -
					</div>
					<div className={styles.value_text}>
						{getFormattedPrice(
							DiscountAmount,
							DicountAmountCurrency,
						)}
					</div>
				</div>
				<div className={styles.discount}>
					<div className={styles.label_text}>
						Discount Applied (Revenue Desk) -
					</div>
					<div className={styles.value_text}>
						{getFormattedPrice(
							DiscountAmountRevenue,
							DiscountAmountRevenueCurrency,
						) || ' -'}
					</div>
				</div>
			</div>
			{Status && (
				<div className={styles.status}>
					<div className={styles.status_label}>Status - </div>
					<div className={styles.status_value}>{Status}</div>
				</div>
			)}
		</div>
	);
}

export default CardHeader;
