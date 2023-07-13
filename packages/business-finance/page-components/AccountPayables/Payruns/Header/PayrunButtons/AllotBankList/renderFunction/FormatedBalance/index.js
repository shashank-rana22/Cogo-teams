import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function FormatedBalance({ itemData = {}, selectedPayrun = {}, checkedRow = null }) {
	const { balance, currency } = itemData;
	const { totalValue } = selectedPayrun || checkedRow || {};

	return (
		<div>
			{balance < totalValue ? (
				<div className={styles.text}>
					{formatAmount({
						amount  : balance,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}

				</div>
			) : (
				formatAmount({
					amount  : balance,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})
			)}
		</div>
	);
}

export default FormatedBalance;
