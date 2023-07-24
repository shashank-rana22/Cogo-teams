import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function FormatedBalance({ itemData = {}, selectedPayrun = {}, checkedRow = {} }) {
	const { balance, currency } = itemData;
	const { totalValue } = selectedPayrun || checkedRow;

	return (
		<div className={balance < totalValue ? styles.text : undefined}>
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
	);
}

export default FormatedBalance;
