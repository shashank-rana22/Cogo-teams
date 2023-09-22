import Header from './Header';
import LeaderboardFilters from './LeaderboardFilters';
import List from './List';
import styles from './styles.module.css';

function LeftPanel() {
	return (
		<div className={styles.container}>
			<Header />

			<LeaderboardFilters />

			<List />
		</div>
	);
}

export default LeftPanel;
