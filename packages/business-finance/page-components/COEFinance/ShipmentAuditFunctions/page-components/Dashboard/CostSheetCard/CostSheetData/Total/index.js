import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function Total({
	currency = '',
	billTotal = '',
	invoiceTotal = '',
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
					amount   : billTotal,
					currency : currency || 'INR',
					options  : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}
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
			</div>
		</div>
	);
}

export default Total;
