import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const ZERO = 0;

const priceFormat = (price, currency, fraction = ZERO) => formatAmount({
	amount  : price || ZERO,
	currency,
	options : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : fraction,
	},
});

function FreightPriceDetail({
	price = '',
	price_currency = '',
	total_price = 0,
	total_price_currency = '',
	total = false,
}) {
	let isPriceDiscounted = false;

	if ((total_price || ZERO) > (price || ZERO)) {
		isPriceDiscounted = true;
	}

	return (
		<div className={styles.container}>
			<div className={styles.amount_wrapper}>
				{isPriceDiscounted ? (
					<div className={styles.discounted_price}>
						{priceFormat(total_price, total_price_currency, total ? 0 : 2)}
					</div>
				) : null}

				<div className={styles.amount}>
					{priceFormat(price, price_currency, total ? 0 : 2)}
				</div>
			</div>

			{total ? (
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
			) : <span className={styles.per_container_label}>Per ctr.</span>}
		</div>
	);
}

export default FreightPriceDetail;
