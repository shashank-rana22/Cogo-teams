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
		deviationPercent    : 'RevenuePercentDeviation',
	};

	const KEY_MAPPINGS_EXPENSE = {
		'Pre Checkout'        : 'preCheckoutSales',
		'Actual Expense'      : 'actualCost',
		'Operational Expense' : 'operationalCost',
		'RD Wallet'           : 'rdWalletUtilizationAmount',
		Deviation             : `${LABEL_MAPPING[type]}CostDeviation`,
		'Buy Quotation'       : 'estimatedCost',
		deviationPercent      : 'CostPercentDeviation',
	};

	const mappings = heading === 'Revenue' ? KEY_MAPPINGS_REVENUE : KEY_MAPPINGS_EXPENSE;
	const getFields = fields({ heading });
	const isLast = getFields.length - DEFAULT_LEN;
	const amount = ({ field }) => (item?.[`${mappings[field]}${taxType}`]
	|| item?.[`${mappings[field]}`] || DEFAULT_AMOUNT);
	const isNegative = amount < DEFAULT_AMOUNT;
	return (
		<div className={styles.card}>
			<div className={styles.head}>
				{heading}
			</div>
			{getFields?.map((field, index) => (
				<div key={field} className={styles.singlefield}>
					<div className={styles.key}>{field}</div>
					<div className={cl`${styles.value} ${isLast === index ? styles.isLast : ''}`}>
						{formatAmount({
							amount   : amount({ field }),
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
						<span className={cl`${styles.percent} ${styles.value} ${isLast === index ? styles.isLast : ''} 
					${isNegative ? styles.negative : styles.positive}`}
						>
							{isLast === index
								? `(${item?.[`${LABEL_MAPPING[type]}${mappings.deviationPercent}${taxType}`]} %)`
								: null}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default DetailCard;
