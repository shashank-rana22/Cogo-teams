import React, { useState } from 'react';

import ExpenseDetailsForm from '../ExpenseDetailsForm';
import NonRecurringSummary from '../NonRecurringSummary';
import RecurringSummary from '../RecurringSummary';
import UploadInvoiceForm from '../UploadInvoiceForm';

interface Props {
	active:string
	createExpenseType:string,
	recurringData?:object,
	setRecurringData?:(obj)=>void,
	nonRecurringData?:object,
	setNonRecurringData?:(obj)=>void,
}

function CreateExpenseForm({
	active,
	createExpenseType,
	recurringData,
	setRecurringData,
	nonRecurringData,
	setNonRecurringData,
}:Props) {
	return (
		<div>
			{active === 'Expense Details'
			&& (
				<ExpenseDetailsForm
					formData={createExpenseType === 'recurring' ? recurringData : nonRecurringData}
					setFormData={createExpenseType === 'recurring' ? setRecurringData : setNonRecurringData}
					createExpenseType={createExpenseType}
				/>
			)}
			{active === 'Upload Invoice' && (
				<UploadInvoiceForm
					formData={createExpenseType === 'recurring' ? recurringData : nonRecurringData}
					setFormData={createExpenseType === 'recurring' ? setRecurringData : setNonRecurringData}
					createExpenseType={createExpenseType}
				/>
			)}
			{ active === 'Final Confirmation' && (
				<div>
					{createExpenseType === 'recurring' ? <RecurringSummary /> : (
						<NonRecurringSummary
							nonRecurringData={nonRecurringData}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default CreateExpenseForm;
