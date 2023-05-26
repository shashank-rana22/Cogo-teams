import styles from './styles.module.css';
import Widget from './Widget';

function UserStatistics({ topCustomer, topCategory, topAgents }) {
	return (
		<div className={styles.container}>
			<Widget label="Users (based on issues)" data={topCustomer} type="Users" />
			<Widget label="Top Categories" data={topCategory} type="Categories" />
			<Widget label="Top Agents" subLabel="Performance Rating" data={topAgents} type="Performance" />
		</div>

	);
}

export default UserStatistics;
