import CustomerPastMonthDataCard from './CustomerPastDataCard';
import Header from './Header';
import GraphDataCard from './PastMonthsDataGraphCard';
import PreviewAndApproveLists from './PreviewApproveLists';
import styles from './styles.module.css';

function Details() {
	const loading = false;
	return (
		<div className={styles.details_prime_container}>
			<Header loading={loading} />
			<div className={styles.customer_cards_past_month}>
				<CustomerPastMonthDataCard loading={loading} />
				<GraphDataCard loading={loading} />
			</div>
			<div className={styles.lists_approve_section}>
				<PreviewAndApproveLists loading={loading} />
			</div>
		</div>
	);
}

export default Details;
