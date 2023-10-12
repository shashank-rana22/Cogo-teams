import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const ONE_PACKAGE_COUNT = 1;

const format = (price, currency) => formatAmount({
	amount  : price || DEFAULT_PRICE_VALUE,
	currency,
	options : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		maximumFractionDigits : 0,
	},
});

function PricePerPackage({
	price = 0,
	price_currency = 'INR',
	total_price = 0,
	showKgTag = false,
	packages_count = 0,
}) {
	return (
		<div className={styles.container}>
			{packages_count ? (
				<span className={styles.packages_count}>
					{packages_count}
					{' '}
					{packages_count > ONE_PACKAGE_COUNT ? 'Boxes' : 'Box'}
				</span>
			) : null}

			<div className={styles.amount}>
				<div className={styles.amount_values}>
					{total_price && total_price !== price ? (
						<span className={styles.discounted_price}>
							{format(total_price, price_currency)}
						</span>
					) : null}

					<span>{format(price, price_currency)}</span>
				</div>

				{showKgTag ? (
					<span className={styles.per_kg_label}>Per Kg.</span>
				) : null}

				{total_price ? (
					<Tooltip
						placement="top"
						trigger="mouseenter"
						interactive
						content={(
							<strong className={styles.tooltip_content}>
								Basic freight + all other services including AIR Freight Local.
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

export default PricePerPackage;
