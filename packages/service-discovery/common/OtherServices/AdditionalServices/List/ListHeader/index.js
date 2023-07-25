import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	seller : 'Seller Responsibilities',
	buyer  : 'Buyer Responsibilities',
};

function ListHeader({ type = '', currency = '', totalPrice = 0 }) {
	return (
		<div className={styles.header}>
			<span>{LABEL_MAPPING[type]}</span>

			<div className={styles.total_price}>
				<span className={styles.cost_label}>Total landed Cost:</span>

				<strong>
					{totalPrice ? formatAmount({
						amount  : totalPrice,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
						},
					}) : 'NA'}
				</strong>
			</div>
		</div>
	);
}

export default ListHeader;
