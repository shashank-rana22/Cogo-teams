import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function Total({
	currency = '',
	billINRTotal = '',
	invoiceINRTotal = '',
	invoiceTotalDeviation = '',
	billTotalDeviation = '',
}) {
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<span className={styles.row_heading}>
					Total
				</span>
			</div>
			<div className={styles.sub_container}>
				{ formatAmount({
					amount   : invoiceINRTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill color={invoiceTotalDeviation >= 0 ? 'green' : 'red'}>
					{`${invoiceTotalDeviation}%`}
				</Pill>
			</div>
			<div className={styles.sub_container}>
				{ formatAmount({
					amount   : billINRTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill color={billTotalDeviation >= 0 ? 'green' : 'red'}>
					{`${billTotalDeviation}%`}
				</Pill>
			</div>
		</div>
	);
}

export default Total;
