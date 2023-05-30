import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getWidth from '../../../../utils/getWidth';

import styles from './styles.module.css';

function Header({ margin_limit }) {
	const { margin_value, margin_currency } = margin_limit;
	return (
		<>
			<div className={styles.note}>
				Please note that reducing the total margin by more than
				<span>
					{formatAmount({
						amount   : margin_value,
						currency : margin_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}

				</span>
				{' '}
				will require an approval.
			</div>
			<div className={styles.row}>
				<div
					className={`${styles.col} ${styles.header}`}
					style={{ width: getWidth(2.45), paddingLeft: '0px' }}
				>
					SERVICE

				</div>
				<div className={`${styles.col} ${styles.header}`} style={{ width: getWidth(2) }}>BUY PRICE</div>
				<div className={`${styles.col} ${styles.header}`} style={{ width: getWidth(1.5) }}>MARGIN TYPE</div>
				<div className={`${styles.col} ${styles.header}`} style={{ width: getWidth(2) }}>CURRENCY</div>
				<div className={`${styles.col} ${styles.header}`} style={{ width: getWidth(2) }}>MARGIN VALUE</div>
				<div className={`${styles.col} ${styles.header}`} style={{ width: getWidth(2) }}>SELL PRICE</div>
			</div>
		</>
	);
}

export default Header;
