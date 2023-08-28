import Loader from './Loader';
import styles from './styles.module.css';

const TOTAL_FIELDS = 6;

function OrgLoaders() {
	return (
		<div className={styles.flex}>
			<div className={styles.left_card}>
				{Array(TOTAL_FIELDS).fill(null).map((key) => <Loader key={key} />)}
			</div>
			<div className={styles.right_card}>
				<Loader />
				<Loader />
			</div>
		</div>
	);
}

export default OrgLoaders;
