import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const ZERO = 0;

function FreightPriceDetail({
	price = '',
	price_currency = '',
	totalPrice = false,
}) {
	return (
		<div className={styles.container}>
			{formatAmount({
				amount   : price || ZERO,
				currency : price_currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'symbol',
					maximumFractionDigits : 0,
				},
			})}

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
	);
}

export default FreightPriceDetail;
