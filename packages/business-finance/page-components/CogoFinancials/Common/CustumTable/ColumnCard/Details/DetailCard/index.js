import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../../commons/showOverflowingNumber';

import styles from './styles.module.css';

const fields = ({ heading, LABEL_MAPPING, type }) => ['Pre Checkout', `${heading === 'Revenue' ? 'KAM' : 'RD'} Wallet`,
	`${heading === 'Revenue' ? 'Sales' : 'Buy'} Quotation`,
	`${startCase(LABEL_MAPPING[type] || '')} ${heading}`, 'Deviation'];

const EXTRA_LENGTH = 1;
const DEFAULT_AMOUNT = 0;
const MAX_DEVIATION_LENGTH = 15;

function DetailCard({ heading = '', item = {}, taxType = '', LABEL_MAPPING = [], type = '' }) {
	const KEY_MAPPINGS_REVENUE = {
		'Pre Checkout'        : 'preCheckoutCost',
		'Actual Revenue'      : 'actualRevenue',
		'Operational Revenue' : 'operationalRevenue',
		Deviation             : `${LABEL_MAPPING[type]}RevenueDeviation`,
		'KAM Wallet'          : 'kamMarginUtilizationAmount',
		'Sales Quotation'     : 'estimatedRevenue',
		deviationPercent      : 'RevenuePercentDeviation',
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
	const getFields = fields({ heading, LABEL_MAPPING, type });
	const isLast = getFields.length - EXTRA_LENGTH;
	const amount = ({ field }) => (item?.[`${mappings[field]}${taxType}`]
	|| item?.[`${mappings[field]}`] || DEFAULT_AMOUNT);

	const deviationPercent = item?.[`${LABEL_MAPPING[type]}${mappings.deviationPercent}${taxType}`];

	const getDeviationColor = ({ value, field }) => {
		if (field === 'Deviation') {
			const valueNum = Number(value || DEFAULT_AMOUNT);
			if (valueNum > DEFAULT_AMOUNT) {
				return '#abcd62'; // positive green
			} if (valueNum < DEFAULT_AMOUNT) {
				return '#ee3425'; // negative red
			}
		}
		return 'unset';
	};

	return (
		<div className={styles.card}>
			<div className={styles.head}>
				{heading}
			</div>
			{getFields?.map((field, index) => (
				<div
					key={field}
					className={styles.singlefield}
				>
					<div className={styles.key}>{field}</div>
					<div
						className={styles.value}
						style={{ color: getDeviationColor({ value: amount({ field }), field }) }}
					>
						{showOverflowingNumber(formatAmount({
							amount   : amount({ field }),
							currency : item?.currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						}), MAX_DEVIATION_LENGTH)}
						<div className={cl`${styles.percent} ${styles.value}}`}>
							{isLast === index
								? `(${deviationPercent} %)`
								: null}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default DetailCard;
