import FeedbackGraph from './FeedbackGraph';
import styles from './styles.module.css';
import TicketGraph from './TicketGraph';

function Graph() {
	return (
		<div className={styles.container}>
			<FeedbackGraph />
			<TicketGraph />
		</div>

	);
}

export default Graph;
