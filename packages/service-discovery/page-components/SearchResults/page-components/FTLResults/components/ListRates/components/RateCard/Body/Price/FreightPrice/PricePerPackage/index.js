import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
// const ONE_PACKAGE_COUNT = 1;

function PricePerPackage({
	price = 0,
	price_currency = 'INR',
	isTotalPrice = false,
}) {
	return (
		<div className={styles.container}>
			{/* {packages_count ? (
				<span className={styles.packages_count}>
					{packages_count}
					{' '}
					{packages_count > ONE_PACKAGE_COUNT ? 'Boxes' : 'Box'}
				</span>
			) : null} */}

			<div className={styles.amount_wrapper}>
				<span className={styles.amount}>
					{formatAmount({
						amount   : price || DEFAULT_PRICE_VALUE,
						currency : price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : isTotalPrice ? 0 : 2,
						},
					})}

					{/* {showKgTag ? (
						<span className={styles.per_kg_label}>Per Kg.</span>
					) : null} */}
				</span>

				{isTotalPrice ? (
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
		</div>
	);
}

export default PricePerPackage;
