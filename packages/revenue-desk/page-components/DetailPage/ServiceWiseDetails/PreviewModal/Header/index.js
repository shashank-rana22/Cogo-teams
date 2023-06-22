import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function Header({ consBuyPrice, conSellPrice, preferredCurrency }) {
	const profit = Number(conSellPrice) - Number(consBuyPrice);
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Preview
			</div>
			<div className={styles.sub_container}>
				<div>
					<div className={styles.key}>
						Profit
					</div>
					<div className={profit >= 0 ? styles.positive_container : styles.negative_container}>
						{formatAmount({
							amount   : profit,
							currency : preferredCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
				<div>
					<div className={styles.key}>
						Profitability
					</div>
					<div className={profit >= 0 ? styles.positive_container : styles.negative_container}>
						{
						consBuyPrice !== 0
							? (Number(Number(profit) / Number(consBuyPrice)) * 100).toFixed(2)
							: 0
					}
						%
					</div>
				</div>
				<div>
					<div className={styles.key}>
						Cons Sell Price
					</div>
					<div className={styles.value}>
						{formatAmount({
							amount   : conSellPrice,
							currency : preferredCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>
				<div>
					<div className={styles.key}>
						Cons Buy Price
					</div>
					<div className={styles.value}>
						{formatAmount({
							amount   : consBuyPrice,
							currency : preferredCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 2,
							},
						})}
					</div>
				</div>

			</div>
		</div>
	);
}
export default Header;
