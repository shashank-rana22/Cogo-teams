import getWidth from '../../../../utils/getWidth';

import styles from './styles.module.css';

function Header() {
	return (
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
	);
}

export default Header;
