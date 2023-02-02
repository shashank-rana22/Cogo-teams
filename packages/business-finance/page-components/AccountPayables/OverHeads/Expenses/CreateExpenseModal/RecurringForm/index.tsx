import React, { useState } from 'react';

import ExpenseDetailsForm from './ExpenseDetailsForm';

function RecurringForm() {
	const [filters, setFilters] = useState({
		repeatEvery: 'week',
	});

	return (
		<div>
			<ExpenseDetailsForm filters={filters} setFilters={setFilters} />
		</div>
	);
}

export default RecurringForm;
