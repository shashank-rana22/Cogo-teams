import { useState } from 'react';

import FilterHeader from './FilterHeader';

function Dashboard() {
	const [dashboardFilters, setDashboardFilters] = useState({});
	return (
		<div>
			<FilterHeader setDashboardFilters={setDashboardFilters} dashboardFilters={dashboardFilters} />
		</div>
	);
}
export default Dashboard;
