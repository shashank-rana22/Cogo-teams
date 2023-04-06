import Content from './Content';
import Filters from './Filters';
import styles from './styles.module.css';

function Dashboard() {
	return (
		<div>
			<div className={styles.title}>
				RFQ Dashboard
			</div>
			<div className={styles.container}>
				<Filters />
				<Content />
			</div>
		</div>
	);
}

export default Dashboard;
