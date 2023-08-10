import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Demand Forecast
			</div>
		</div>
	);
}

export default Header;
