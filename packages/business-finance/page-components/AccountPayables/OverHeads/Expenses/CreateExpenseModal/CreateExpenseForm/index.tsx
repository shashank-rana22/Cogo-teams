import React, { useState } from 'react';

import ExpenseDetailsForm from '../ExpenseDetailsForm';
import UploadInvoiceForm from '../UploadInvoiceForm';

interface Props {
	active:string
	createExpenseType:string
}

function CreateExpenseForm({ active, createExpenseType }:Props) {
	const [recurringFilters, setRecurringFilters] = useState({
		repeatEvery: 'week',
	});

	const [nonRecurringFilters, setNonRecurringFilters] = useState({
	});

	return (
		<div>
			{active === 'Expense Details'
			&& (
				<ExpenseDetailsForm
					filters={createExpenseType === 'recurring' ? recurringFilters : nonRecurringFilters}
					setFilters={createExpenseType === 'recurring' ? setRecurringFilters : setNonRecurringFilters}
					createExpenseType={createExpenseType}
				/>
			)}
			{active === 'Upload Invoice' && (
				<UploadInvoiceForm
					filters={createExpenseType === 'recurring' ? recurringFilters : nonRecurringFilters}
					setFilters={createExpenseType === 'recurring' ? setRecurringFilters : setNonRecurringFilters}
					createExpenseType={createExpenseType}
				/>
			)}
		</div>
	);
}

export default CreateExpenseForm;
