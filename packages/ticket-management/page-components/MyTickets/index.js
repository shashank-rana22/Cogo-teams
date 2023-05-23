import Header from '../../common/Header';

import FilterTicketsSection from './FilterTicketsSection';
import StatsSection from './StatsSection';
import styles from './styles.module.css';

function MyTickets() {
	return (
		<div className={styles.main_container}>
			<Header />
			<StatsSection />
			<FilterTicketsSection />
		</div>
	);
}

export default MyTickets;
