import Header from '../Dashboard/Header';

import styles from './styles.module.css';

function Dashboard() {
	return (
		<div className={styles.container}>
			<Header activeTab="financial_close" />
		</div>
	);
}

export default Dashboard;
