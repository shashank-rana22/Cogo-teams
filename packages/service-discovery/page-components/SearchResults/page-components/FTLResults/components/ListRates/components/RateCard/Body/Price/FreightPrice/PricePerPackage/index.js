import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const ZERO_FRACTION = 0;

const format = (price, currency, fraction = ZERO_FRACTION) => formatAmount({
	amount  : price || DEFAULT_PRICE_VALUE,
	currency,
	options : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : fraction,
	},
});

function PricePerPackage({
	price = 0,
	price_currency = 'INR',
	total_price_currency = 'INR',
	total_price = 0,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.amount_wrapper}>
				{total_price && total_price !== price ? (
					<span className={styles.discounted_price}>
						{format(total_price, total_price_currency)}
					</span>
				) : null}

				<span className={styles.amount}>
					{format(price, price_currency, total_price ? 0 : 2)}
				</span>
			</div>

			{total_price ? (
				<Tooltip
					placement="top"
					trigger="mouseenter"
					interactive
					content={(
						<strong className={styles.tooltip_content}>
							Basic freight + all other services.
						</strong>
					)}
				>
					<IcMInfo className={styles.info_icon} />
				</Tooltip>
			) : null}
		</div>
	);
}

export default PricePerPackage;
