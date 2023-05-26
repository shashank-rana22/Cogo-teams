import styles from './styles.module.css';
import Widget from './Widget';

function UserStatistics({ topAgents, loading }) {
	return (
		<div className={styles.container}>
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
