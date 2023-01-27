import React from 'react';

import showOverflowingNumber from '../../../../../../../commons/showOverflowingNumber';
import getFormattedPrice from '../../../../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface itemTypes {
	grandTotal?: number;
	billCurrency?: string;
	currency?: string;
}

interface propsType {
	item: itemTypes;
	field?: any;
}

function AmountWithCurrency({ item, field }: propsType) {
	const { grandTotal, billCurrency, currency }: itemTypes = item;

	const formatAmount = getFormattedPrice(
        	grandTotal!,
        	billCurrency! || currency || 'INR',
	) || '';
	return (

		<div className={styles.text}>
			{field.key === 'grandTotal' && (
				<div>
					<text>{showOverflowingNumber(formatAmount, 12)}</text>
				</div>
			)}
		</div>

	);
}

export default AmountWithCurrency;
