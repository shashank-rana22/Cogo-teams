import React from 'react';

import showOverflowingNumber from '../../../../../../../commons/showOverflowingNumber';
import getFormattedPrice from '../../../../../../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

interface ItemTypes {
	grandTotal?: number;
	billCurrency?: string;
	currency?: string;
}

interface PropsType {
	item: ItemTypes;
	field?: any;
}

function AmountWithCurrency({ item, field }: PropsType) {
	const { grandTotal, billCurrency, currency }: ItemTypes = item;

	const formatAmount = getFormattedPrice(
		grandTotal!,
		billCurrency! || currency || 'INR',
	) || '';
	return (

		<div className={styles.text}>
			{field.key === 'grandTotal' && (
				<div className={styles.size}>
					<text>{showOverflowingNumber(formatAmount, 12)}</text>
				</div>
			)}
		</div>

	);
}

export default AmountWithCurrency;
