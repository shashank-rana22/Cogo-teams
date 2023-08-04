import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

function FreightPriceDetail({
	container_size = '',
	container_type = '',
	price = '',
	price_currency = '',
	totalPrice = false,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{container_size && !totalPrice ? (
					<div className={styles.container_details}>
						{container_size}
						ft. ctr
						{' '}
						{container_type}
					</div>
				) : null}
			</div>

			<div className={styles.amount}>
				{formatAmount({
					amount   : price || ZERO,
					currency : price_currency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'symbol',
						maximumFractionDigits : 0,
					},
				})}
				{!totalPrice ? (
					<div className={styles.container_details}>
						Per ctr.
					</div>
				) : null}
			</div>

		</div>
	);
}

export default FreightPriceDetail;
