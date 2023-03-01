import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { nonRecurringExpenseDetails } from '../../../Controls/nonRecurringExpenseDetails';
import { recurringExpenseDetails } from '../../../Controls/recurringExpenseDetails';

interface Props {
	filters:object,
	setFilters:(p: object) => void,
	createExpenseType:string,
}

function ExpenseDetailsForm({ filters, setFilters, createExpenseType }:Props) {
	const [categoryOptions, setCategoryOptions] = useState();
	const [subCategoryOptions, setSubCategoryOptions] = useState();

	let expenseControls;
	if (createExpenseType === 'recurring') {
		expenseControls = recurringExpenseDetails;
	} else {
		expenseControls = nonRecurringExpenseDetails;
	}

	return (
		<div>
			<Filter
				controls={expenseControls({
					filters,
					setFilters,
					categoryOptions,
					setCategoryOptions,
					subCategoryOptions,
					setSubCategoryOptions,
				})}
				filters={filters}
				setFilters={setFilters}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;
