import styles from './styles.module.css';
import Widget from './Widget';

function UserStatistics({ topCustomer, topCategory, topAgents, loading }) {
	return (
		<div className={styles.container}>
			<Widget label="Users (based on issues)" data={topCustomer} type="Users" loading={loading} />
			<Widget label="Top Categories" data={topCategory} type="Categories" loading={loading} />
			<Widget
				label="Top Agents"
				subLabel="Performance Rating"
				data={topAgents}
				type="Performance"
				loading={loading}
			/>
		</div>

	);
}

export default UserStatistics;
