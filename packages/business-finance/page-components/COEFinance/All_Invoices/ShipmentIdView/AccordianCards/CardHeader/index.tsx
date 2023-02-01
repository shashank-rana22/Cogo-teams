import React from 'react';

import TabSelect from '../../../../../commons/TabSelect/index';
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface PropsType {
	itemData: any;
	amountTab: string;
	setAmountTab: Function;
}

function CardHeader({ amountTab, setAmountTab, itemData }: PropsType) {
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
							itemData.discount_amount,
							itemData.discount_amount_currency,
						)}
					</div>
				</div>
				<div className={styles.discount}>
					<div className={styles.label_text}>
						Discount Applied (Revenue Desk) -
					</div>
					<div className={styles.value_text}>
						{getFormattedPrice(
							itemData.discount_amount_revenue,
							itemData.discount_amount_revenue_currency,
						) || ' -'}
					</div>
				</div>
			</div>
			{itemData.status && (
				<div className={styles.status}>
					<div className={styles.status_label}>Status - </div>
					<div className={styles.status_value}>{itemData.status}</div>
				</div>
			)}
		</div>
	);
}

export default CardHeader;
