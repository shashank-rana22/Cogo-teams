import FeedbackGraph from './FeedbackGraph';
import styles from './styles.module.css';

function Graph({ customerSatisfactionStats }) {
	return (
		<div className={styles.container}>
			<FeedbackGraph customerSatisfactionStats={customerSatisfactionStats} />
		</div>

	);
}

export default Graph;
