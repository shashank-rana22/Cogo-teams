// import BLDetails from './BLDetails';
import ManageServices from './ManageServices';
import Services from './Services';
import styles from './styles.module.css';

function Overview() {
	return (
		<div className={styles.container}>
			<ManageServices />
			<Services />
		</div>
	);
}
export default Overview;
