import PocSop from './PocSop';
import ShipmentHeader from './ShipmentHeader';
import styles from './styles.module.css';

function TopBar() {
	return (
		<div className={styles.mainTopBar}>
			<ShipmentHeader />
			<PocSop />
		</div>
	);
}

export default TopBar;
