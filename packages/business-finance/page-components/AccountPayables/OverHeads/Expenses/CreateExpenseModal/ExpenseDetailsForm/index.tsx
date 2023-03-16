import { getMonth } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { months } from '../../../constants/months';
import { nonRecurringExpenseDetails } from '../../../Controls/nonRecurringExpenseDetails';
import { recurringExpenseDetails } from '../../../Controls/recurringExpenseDetails';
import useListCogoEntities from '../../hooks/useListCogoEntities';

interface FormData {
	transactionDate?:string | Date,
}
interface Props {
	formData:FormData,
	setFormData:(p: object) => void,
	createExpenseType:string,
}

function ExpenseDetailsForm({ formData, setFormData, createExpenseType }:Props) {
	const [categoryOptions, setCategoryOptions] = useState();
	const [subCategoryOptions, setSubCategoryOptions] = useState();
	const [branchOptions, setBranchOptions] = useState();
	const [entityOptions, setEntityOptions] = useState();

	const date = formData?.transactionDate;

	useEffect(() => {
		if (date) {
			setFormData((prev) => ({ ...prev, periodOfTransaction: months[getMonth(date) + 1] }));
		} else {
			setFormData((prev) => ({ ...prev, periodOfTransaction: null }));
		}
	}, [date, setFormData]);

	const { entityList } = useListCogoEntities();

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
					entityList,
					entityOptions,
					setEntityOptions,
				})}
				filters={formData}
				setFilters={setFormData}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;
