import CustomerPastMonthDataCard from './CustomerPastDataCard';
import Header from './Header';
import GraphDataCard from './PastMonthsDataGraphCard';
import PreviewAndApproveLists from './PreviewApproveLists';
import styles from './styles.module.css';

function Details() {
	return (
		<div className={styles.details_prime_container}>
			<Header />
			<div className={styles.customer_cards_past_month}>
				<CustomerPastMonthDataCard />
				<GraphDataCard />
			</div>
			<div className={styles.lists_approve_section}>
				<PreviewAndApproveLists />
			</div>
		</div>
	);
}

export default Details;
