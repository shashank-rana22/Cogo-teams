import React, { useState } from 'react';

import ExpenseDetailsForm from '../ExpenseDetailsForm';
import NonRecurringSummary from '../NonRecurringSummary';
import RecurringSummary from '../RecurringSummary';
import UploadInvoiceForm from '../UploadInvoiceForm';

interface Props {
	active:string
	createExpenseType:string,
	recurringData?:object,
	setRecurringData?:(obj:any)=>void,
	nonRecurringData?:object,
	setNonRecurringData?:(obj:any)=>void,
	setIsFormValidated?:(obj:any)=>void,
}

function CreateExpenseForm({
	active,
	createExpenseType,
	recurringData,
	setRecurringData,
	nonRecurringData,
	setNonRecurringData,
	setIsFormValidated,
}:Props) {
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [taxOptions, setTaxOptions] = useState([]);
	const [branchOptions, setBranchOptions] = useState([]);
	const [entityOptions, setEntityOptions] = useState([]);
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);

	let formData:any;
	let setFormData:any;
	if (createExpenseType === 'recurring') {
		formData = recurringData;
		setFormData = setRecurringData;
	} else if (createExpenseType === 'nonRecurring') {
		formData = nonRecurringData;
		setFormData = setNonRecurringData;
	}

	return (
		<div>
			{active === 'Expense Details'
			&& (
				<ExpenseDetailsForm
					formData={formData}
					setFormData={setFormData}
					createExpenseType={createExpenseType}
					categoryOptions={categoryOptions}
					setCategoryOptions={setCategoryOptions}
					subCategoryOptions={subCategoryOptions}
					setSubCategoryOptions={setSubCategoryOptions}
					branchOptions={branchOptions}
					setBranchOptions={setBranchOptions}
					entityOptions={entityOptions}
					setEntityOptions={setEntityOptions}
					setIsFormValidated={setIsFormValidated}
				/>
			)}
			{active === 'Upload Invoice' && createExpenseType === 'nonRecurring' && (
				<UploadInvoiceForm
					formData={formData}
					setFormData={setFormData}
					createExpenseType={createExpenseType}
					isUploadConfirm={isUploadConfirm}
					setIsUploadConfirm={setIsUploadConfirm}
					taxOptions={taxOptions}
					setTaxOptions={setTaxOptions}
					setIsFormValidated={setIsFormValidated}
				/>
			)}
			{ active === 'Final Confirmation' && (
				<div>
					{createExpenseType === 'nonRecurring' && (
						<NonRecurringSummary
							nonRecurringData={nonRecurringData}
							setNonRecurringData={setNonRecurringData}
						/>
					)}
					{createExpenseType === 'recurring' && (
						<RecurringSummary
							recurringData={recurringData}
							setRecurringData={setRecurringData}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default CreateExpenseForm;
