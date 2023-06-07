import { Button } from '@cogoport/components';

import FilterTicketsSection from '../../common/FilterTicketsSection';

import StatsSection from './StatsSection';
import styles from './styles.module.css';

function MyTickets() {
	return (
		<div>
			<div className={styles.head}>
				<span className={styles.title}>My Tickets</span>
				<Button>Raise Ticket</Button>
			</div>
			<StatsSection />
			<FilterTicketsSection />
		</div>
	);
}

export default MyTickets;
