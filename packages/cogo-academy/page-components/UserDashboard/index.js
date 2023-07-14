import LeftSection from './LeftSection';
import styles from './styles.module.css';
import TestsList from './TestsList';

function UserDashboard() {
	return (
		<div className={styles.container}>
			<LeftSection />
			<TestsList />
		</div>
	);
}

export default UserDashboard;
