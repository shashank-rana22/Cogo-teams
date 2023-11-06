import { Pill } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function Total({
	currency = '',
	billTotal = '',
	invoiceTotal = '',
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
					amount   : invoiceTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill color={invoiceTotalDeviation >= 0 ? 'green' : 'red'}>
					{`${invoiceTotalDeviation >= 0 ? '+' : '-'} ${invoiceTotalDeviation}%`}
				</Pill>
			</div>
			<div className={styles.sub_container}>
				{ formatAmount({
					amount   : billTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
				<Pill color={billTotalDeviation >= 0 ? 'green' : 'red'}>
					{`${billTotalDeviation >= 0 ? '+' : '-'} ${billTotalDeviation}%`}
				</Pill>
			</div>
		</div>
	);
}

export default Total;
