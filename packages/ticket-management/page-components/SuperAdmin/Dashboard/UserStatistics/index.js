import styles from './styles.module.css';
import Widget from './Widget';

function UserStatistics({ topCustomer }) {
	return (
		<div className={styles.container}>
			<Widget label="Users (based on issues)" data={topCustomer} />
			<Widget label="Top Categories" />
			<Widget label="Top Agents" subLabel="Performance Rating" />
		</div>

	);
}

export default UserStatistics;
