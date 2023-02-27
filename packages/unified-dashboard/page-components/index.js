/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import BookingAnalysis from './BookingAnalysis';
import Profitability from './Profitability';

function UnifiedDashboard() {
	const [headerFilters, setHeaderFilters] = useState({ currency: false });
	return (
		<>
			<BookingAnalysis headerFilters={headerFilters} />
			<Profitability headerFilters={headerFilters} />
		</>

	);
}

export default UnifiedDashboard;
