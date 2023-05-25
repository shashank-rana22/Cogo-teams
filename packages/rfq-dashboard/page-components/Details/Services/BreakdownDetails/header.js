import getWidth from '../../../../utils/getWidth';

import styles from './styles.module.css';

function Header() {
	return (
		<>
			<div className={styles.note}>
				Please note that reducing the total margin by more than
				<span>INR 8000</span>
				{' '}
				will require an approval.
			</div>
			<div className={styles.row}>
				<div className={styles.col} style={{ width: getWidth(2.45) }}>SERVICE</div>
				<div className={styles.col} style={{ width: getWidth(2) }}>BUY PRICE</div>
				<div className={styles.col} style={{ width: getWidth(1.5) }}>MARGIN TYPE</div>
				<div className={styles.col} style={{ width: getWidth(2) }}>CURRENCY</div>
				<div className={styles.col} style={{ width: getWidth(2) }}>MARGIN VALUE</div>
				<div className={styles.col} style={{ width: getWidth(2) }}>SELL PRICE</div>
			</div>
		</>
	);
}

export default Header;
