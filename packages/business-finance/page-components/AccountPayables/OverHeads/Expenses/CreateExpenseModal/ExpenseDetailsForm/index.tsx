import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { nonRecurringExpenseDetails } from '../../../Controls/nonRecurringExpenseDetails';
import { recurringExpenseDetails } from '../../../Controls/recurringExpenseDetails';

interface Props {
	formData:object,
	setFormData:(p: object) => void,
	createExpenseType:string,
}

function ExpenseDetailsForm({ formData, setFormData, createExpenseType }:Props) {
	const [categoryOptions, setCategoryOptions] = useState();
	const [subCategoryOptions, setSubCategoryOptions] = useState();
	const [branchOptions, setBranchOptions] = useState();

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
					formData,
					setFormData,
					categoryOptions,
					setCategoryOptions,
					subCategoryOptions,
					setSubCategoryOptions,
					branchOptions,
					setBranchOptions,
				})}
				filters={formData}
				setFilters={setFormData}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;
