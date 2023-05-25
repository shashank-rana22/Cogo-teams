import FeedbackGraph from './FeedbackGraph';
import styles from './styles.module.css';
import TicketGraph from './TicketGraph';

function Graph({ customerSatisfactionStats }) {
	return (
		<div className={styles.container}>
			<FeedbackGraph customerSatisfactionStats={customerSatisfactionStats} />
			<TicketGraph />
		</div>

	);
}

export default Graph;
