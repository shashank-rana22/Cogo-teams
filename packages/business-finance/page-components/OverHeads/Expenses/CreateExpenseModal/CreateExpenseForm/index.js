import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import useGetTradePartyDetails from '../../hooks/useGetTradePartyDetails';
import ExpenseDetailsForm from '../ExpenseDetailsForm';
import NonRecurringSummary from '../NonRecurringSummary';
import RecurringSummary from '../RecurringSummary';
import UploadInvoiceForm from '../UploadInvoiceForm';

function CreateExpenseForm({
	active = '',
	createExpenseType = '',
	recurringData = {},
	setRecurringData = () => {},
	nonRecurringData = {},
	setNonRecurringData = () => {},
	setIsFormValidated = () => {},
}) {
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [taxOptions, setTaxOptions] = useState([]);
	const [branchOptions, setBranchOptions] = useState([]);
	const [entityOptions, setEntityOptions] = useState([]);
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);

	let formData;
	let setFormData;
	if (createExpenseType === 'recurring') {
		formData = recurringData;
		setFormData = setRecurringData;
	} else if (createExpenseType === 'nonRecurring') {
		formData = nonRecurringData;
		setFormData = setNonRecurringData;
	}

	const { vendorID } = nonRecurringData || {};
	const { tradePartyData } = useGetTradePartyDetails(vendorID);
	return (
		<div>
			{active === 'Expense Details' && (
				<div style={{ marginTop: '40px' }}>
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
				</div>
			)}
			{active === 'Upload Invoice'
				&& createExpenseType === 'nonRecurring' && (
					<UploadInvoiceForm
						formData={formData}
						setFormData={setFormData}
						isUploadConfirm={isUploadConfirm}
						setIsUploadConfirm={setIsUploadConfirm}
						taxOptions={taxOptions}
						setTaxOptions={setTaxOptions}
						setIsFormValidated={setIsFormValidated}
						isTaxApplicable={
							tradePartyData?.[GLOBAL_CONSTANTS.zeroth_index]
								?.is_tax_applicable
						}
					/>
			)}

			{active === 'Final Confirmation' && (
				<div>
					{createExpenseType === 'nonRecurring' && (
						<NonRecurringSummary
							nonRecurringData={nonRecurringData}
							setNonRecurringData={setNonRecurringData}
							tradePartyData={tradePartyData}
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