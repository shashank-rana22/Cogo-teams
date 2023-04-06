import CustomerPastMonthDataCard from './CustomerPastDataCard';
import Header from './Header';
import GraphDataCard from './PastMonthsDataGraphCard';
import styles from './styles.module.css';

function Details() {
	return (
		<div className={styles.details_prime_container}>
			<Header />
			<div className={styles.customer_cards_past_month}>
				<CustomerPastMonthDataCard />
				<GraphDataCard />
			</div>
		</div>
	);
}

export default Details;
