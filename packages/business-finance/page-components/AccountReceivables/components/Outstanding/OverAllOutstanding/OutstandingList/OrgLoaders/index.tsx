import Loader from './Loader';
import styles from './styles.module.css';

function OrgLoaders() {
	return (
		<div className={styles.flex}>
			<div className={styles.left_card}>
				<Loader />
				<Loader />
				<Loader />
				<Loader />
				<Loader />
				<Loader />
			</div>
			<div className={styles.right_card}>
				<Loader />
				<Loader />
			</div>
		</div>
	);
}

export default OrgLoaders;
