import React from 'react';

import TabSelect from '../../../../../commons/TabSelect/index';
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice';
import { toTitleCase } from '../../../../utils/getFormattedData';

import styles from './styles.module.css';

interface ItemProps {
	discountAppliedKam?:number;
	discountAppliedRevenueDesk?:number;
	jobStatus?: string,
}
interface PropsType {
	itemData: ItemProps;
	amountTab: string;
	setAmountTab: Function;
}

function CardHeader({ amountTab, setAmountTab, itemData }: PropsType) {
	const {
		discountAppliedKam,
		discountAppliedRevenueDesk,
		jobStatus,
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
						Discount Applied (KAM) :
					</div>
					<div className={styles.value_text}>
						{getFormattedPrice(
							discountAppliedKam,
							'INR',
						)}
					</div>
				</div>
				<div className={styles.discount}>
					<div className={styles.label_text}>
						Discount Applied (Revenue Desk) :
					</div>
					<div className={styles.value_text}>
						{getFormattedPrice(
							discountAppliedRevenueDesk,
							'INR',
						) || ' -'}
					</div>
				</div>
			</div>
			{jobStatus && (
				<div className={styles.status}>
					<div className={styles.status_label}>Status - </div>
					<div className={styles.status_value}>{toTitleCase(jobStatus)}</div>
				</div>
			)}
		</div>
	);
}

export default CardHeader;
