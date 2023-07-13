import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function FormatedAmount({ itemData = {}, selectedPayrun = null, checkedRow = null }) {
	const { balance, currency, utilizedAmount } = itemData;
	const { totalValue } = selectedPayrun || checkedRow || {};

	return (
		<div>
			{balance < totalValue ? (
				<div className={styles.text}>
					{formatAmount({
						amount  : utilizedAmount,
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
					amount  : utilizedAmount,
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

export default FormatedAmount;
