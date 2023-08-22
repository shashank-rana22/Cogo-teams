import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
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
					<div className={styles.text}>
						Per ctr.
					</div>
				) : null}

				{totalPrice ? (
					<Tooltip
						placement="top"
						trigger="mouseenter"
						interactive
						content={(
							<strong className={styles.tooltip_content}>
								Basic freight + all other services including FCL Freight Local
							</strong>
						)}
					>
						<IcMInfo className={styles.info_icon} />
					</Tooltip>
				) : null}
			</div>
		</div>
	);
}

export default FreightPriceDetail;
