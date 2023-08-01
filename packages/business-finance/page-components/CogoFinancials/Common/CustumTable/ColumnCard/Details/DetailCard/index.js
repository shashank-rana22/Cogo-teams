import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

const fields = ({ heading }) => ['Pre Checkout', `${heading === 'Revenue' ? 'KAM' : 'RD'} Wallet`,
	`${heading === 'Revenue' ? 'Sales' : 'Buy'} Quotation`, `Actual ${heading}`, 'Deviation'];

const DEFAULT_LEN = 1;
const DEFAULT_AMOUNT = 0;

function DetailCard({ heading = '', item = {}, taxType = '', LABEL_MAPPING = [], type = '' }) {
	const KEY_MAPPINGS_REVENUE = {
		'Pre Checkout'      : 'preCheckoutCost',
		'Actual Revenue'    : 'actualRevenue',
		'Operation Revenue' : 'operationalRevenue',
		Deviation           : `${LABEL_MAPPING[type]}RevenueDeviation`,
		'KAM Wallet'        : 'kamMarginUtilizationAmount',
		'Sales Quotation'   : 'estimatedRevenue',
	};

	const KEY_MAPPINGS_EXPENSE = {
		'Pre Checkout'        : 'preCheckoutSales',
		'Actual Expense'      : 'actualCost',
		'Operational Expense' : 'operationalCost',
		'RD Wallet'           : 'rdWalletUtilizationAmount',
		Deviation             : `${LABEL_MAPPING[type]}CostDeviation`,
		'Buy Quotation'       : 'estimatedCost',
	};

	const mappings = heading === 'Revenue' ? KEY_MAPPINGS_REVENUE : KEY_MAPPINGS_EXPENSE;
	const getFields = fields({ heading });
	return (
		<div className={styles.card}>
			<div className={styles.head}>
				{heading}
			</div>
			{getFields?.map((field) => (
				<div key={field} className={styles.singlefield}>
					<div className={styles.key}>{field}</div>
					<div className={cl`${styles.value} ${getFields.length - DEFAULT_LEN ? styles.isLast : ''}`}>
						{formatAmount({
							amount: item?.[`${mappings[field]}${taxType}`]
							|| item?.[`${mappings[field]}`] || DEFAULT_AMOUNT,
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
			))}
		</div>
	);
}

export default DetailCard;
