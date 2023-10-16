import { Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import TabSelect from '../../../../../commons/TabSelect/index';
import { toTitleCase } from '../../../../utils/getFormattedData';

import styles from './styles.module.css';

function CardHeader({
	amountTab = '',
	setAmountTab = () => {},
	itemData = {},
	showTab = false,
	shipmentIdView = true,
	isCheckoutQuote = false,
	setIsCheckoutQuote = () => {},
}) {
	const {
		discountAppliedKam,
		discountAppliedRevenueDesk,
		jobStatus,
	} = itemData || {};

	let options = [
		{ name: 'Expense', value: 'expense' },
		{ name: 'Income', value: 'income' },
	];

	if (!shipmentIdView) {
		options = [{ name: 'Sell Quote', value: 'sellQuote' },
			{ name: 'Buy Quote', value: 'buyQuote' }, ...options];
	}

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
						{formatAmount({
							amount   :	discountAppliedKam,
							currency :	GLOBAL_CONSTANTS.currency_code.INR,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						})}
					</div>
				</div>
				<div className={styles.discount}>
					<div className={styles.label_text}>
						Discount Applied (Revenue Desk) :
					</div>
					<div className={styles.value_text}>
						{formatAmount({
							amount   :	discountAppliedRevenueDesk,
							currency :	GLOBAL_CONSTANTS.currency_code.INR,
							options  : {
								style           : 'currency',
								currencyDisplay : 'code',
							},
						}) || ' -'}
					</div>
				</div>
			</div>
			{jobStatus && (
				<div className={styles.status}>
					<div className={styles.status_label}>Status - </div>
					<div className={styles.status_value}>{toTitleCase(jobStatus)}</div>
				</div>
			)}
			{showTab && amountTab === 'sellQuote' ? (
				<Toggle
					name="a4"
					size="sm"
					onLabel="Checkout"
					offLabel="Current"
					onChange={() => setIsCheckoutQuote(!isCheckoutQuote)}
				/>
			) : null}
		</div>
	);
}

export default CardHeader;
