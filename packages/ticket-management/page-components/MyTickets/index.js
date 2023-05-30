import FilterTicketsSection from '../../common/FilterTicketsSection';
import Header from '../../common/Header';

import StatsSection from './StatsSection';

function MyTickets() {
	return (
		<div>
			<Header />
			<StatsSection />
			<FilterTicketsSection />
		</div>
	);
}

export default MyTickets;
