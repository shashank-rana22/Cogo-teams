import React, { useState } from 'react';

import ExpenseDetailsForm from '../ExpenseDetailsForm';
import UploadInvoiceForm from '../UploadInvoiceForm';

interface Props {
	active:string
}

function RecurringForm({ active }:Props) {
	const [recurringFilters, setRecurringFilters] = useState({
		repeatEvery: 'week',
	});

	return (
		<div>
			{active === 'Expense Details'
			&& <ExpenseDetailsForm filters={recurringFilters} setFilters={setRecurringFilters} />}
			{active === 'Upload Invoice' && (
				<UploadInvoiceForm
					filters={recurringFilters}
					setFilters={setRecurringFilters}
				/>
			)}
		</div>
	);
}

export default RecurringForm;
