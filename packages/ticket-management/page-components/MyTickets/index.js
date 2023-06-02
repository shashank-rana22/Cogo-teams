import FilterTicketsSection from '../../common/FilterTicketsSection';

import StatsSection from './StatsSection';

function MyTickets() {
	return (
		<div>
			<h2>My Tickets</h2>
			<StatsSection />
			<FilterTicketsSection />
		</div>
	);
}

export default MyTickets;
