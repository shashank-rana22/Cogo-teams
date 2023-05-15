import Stationary from './Stationary';
import styles from './styles.module.css';
import Usage from './Usage';

function StationaryManagement() {
	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				<Stationary />
			</div>

			<div className={styles.sub_container}>
				<Usage />
			</div>
		</div>
	);
}

export default StationaryManagement;