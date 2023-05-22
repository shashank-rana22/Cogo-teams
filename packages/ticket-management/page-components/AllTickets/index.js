import Header from '../../common/Header';

import FilterTicketsSection from './FilterTicketsSection';
import StatsSection from './StatsSection';
import styles from './styles.module.css';

function AllTickets() {
	return (
		<div className={styles.main_container}>
			<Header />
			<StatsSection />
			<FilterTicketsSection />
		</div>
	);
}

export default AllTickets;
