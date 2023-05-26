import Header from '../../common/Header';

import FilterTicketsSection from './FilterTicketsSection';
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
