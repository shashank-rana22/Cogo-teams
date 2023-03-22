import Loader from './Loader';
import styles from './styles.module.css';

function OrgLoaders() {
	return (
		<div className={styles.Flex}>
			<div className={styles.LeftCard}>
				<Loader />
				<Loader />
				<Loader />
				<Loader />
				<Loader />
				<Loader />
			</div>
			<div className={styles.RightCard}>
				<Loader />
				<Loader />
			</div>
		</div>
	);
}

export default OrgLoaders;
