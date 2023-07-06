import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

function FreightPriceDetail({
	container_size = '',
	container_type = '',
	price = '',
	price_currency = '',
	totalPrice = false,
}) {
	return (
		<div className={styles.container}>
			{container_size ? (
				<div className={styles.containerDetails}>
					{container_size}
					ft. ctr
					{' '}
					{container_type}
				</div>
			) : null}

			<div className={styles.amount}>
				{`${formatAmount({
					amount   : price || 0,
					currency : price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}`}
				{!totalPrice ? (
					<div className={styles.containerDetails}>
						Per ctr.
					</div>
				) : null}
			</div>

		</div>
	);
}

export default FreightPriceDetail;
