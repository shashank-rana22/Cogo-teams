import { startCase, getMonth, isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import Filter from '../../../../commons/Filters';
import { months } from '../../../constants/months';
import { nonRecurringExpenseDetails } from '../../../Controls/nonRecurringExpenseDetails';
import { recurringExpenseDetails } from '../../../Controls/recurringExpenseDetails';
import { officeLocations } from '../../../utils/officeLocations';
import useListCogoEntities from '../../hooks/useListCogoEntities';

function ExpenseDetailsForm({
	formData,
	setFormData,
	createExpenseType,
	categoryOptions,
	setCategoryOptions,
	setSubCategoryOptions,
	setBranchOptions,
	setEntityOptions,
	branchOptions,
	subCategoryOptions,
	entityOptions,
	setIsFormValidated,
}) {
	const {
		transactionDate: date,
		vendorName,
		invoiceDate,
		periodOfTransaction,
		entityObject,
		registrationNumber,
		expenseCategory,
		expenseSubCategory,
		branch,
		paymentMode,
		payableAmount,
		currency,
		repeatEvery,
		startDate,
		endDate,
		agreementNumber,
		description,
		uploadedInvoice,
	} = formData || {};

	const { entityList } = useListCogoEntities({});

	useEffect(() => {
		if (date) {
			setFormData((prev) => ({
				...prev,
				periodOfTransaction: months[getMonth(date) + 1],
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				periodOfTransaction: null,
			}));
		}
	}, [date, setFormData]);

	useEffect(() => {
		// calling list_cogo_entities and setting entity options
		if (!isEmpty(entityList)) {
			const ENTITIES = [];
			(entityList || []).forEach((entity) => {
				const {
					id,
					entity_code: entityCode,
					business_name: name,
				} = entity || {};
				if (entity.status === 'active') {
					ENTITIES.push({
						...entity,
						label : `${entityCode}-${name}`,
						value : id,
					});
				}
			});
			setEntityOptions([...ENTITIES]);
		}
	}, [entityList, setEntityOptions]);

	useEffect(() => {
		// Validations to ensure that all inputs are filled before moving to next page
		if (createExpenseType === 'nonRecurring') {
			const nonRecurringValidated =				date
				&& vendorName
				&& invoiceDate
				&& periodOfTransaction
				&& entityObject
				&& registrationNumber
				&& expenseCategory
				&& branch
				&& paymentMode;
			if (nonRecurringValidated) {
				setIsFormValidated(true);
			} else {
				setIsFormValidated(false);
			}
		}
		if (createExpenseType === 'recurring') {
			const recurringValidated =				vendorName
				&& registrationNumber
				&& expenseCategory
				&& entityObject
				&& payableAmount
				&& currency
				&& repeatEvery
				&& startDate
				&& endDate
				&& branch
				&& agreementNumber
				&& description
				&& !isEmpty(uploadedInvoice);
			if (recurringValidated) {
				setIsFormValidated(true);
			} else {
				setIsFormValidated(false);
			}
		}
	}, [
		date,
		vendorName,
		invoiceDate,
		periodOfTransaction,
		entityObject,
		registrationNumber,
		expenseCategory,
		expenseSubCategory,
		branch,
		paymentMode,
		setIsFormValidated,
		createExpenseType,
		payableAmount,
		currency,
		repeatEvery,
		startDate,
		endDate,
		agreementNumber,
		description,
		uploadedInvoice,
	]);

	let expenseControls;
	if (createExpenseType === 'recurring') {
		expenseControls = recurringExpenseDetails;
	} else if (createExpenseType === 'nonRecurring') {
		expenseControls = nonRecurringExpenseDetails;
	}

	const handleVendorChange = (obj) => {
		const {
			services,
			business_name: BUSINESS_NAME,
			registration_number: REGISTRATION_NUMBER,
			id: VENDOR_ID,
			serial_id: SERIAL_ID,
		} = obj || {};

		setCategoryOptions(
			services?.map((service) => ({
				label : startCase(service?.category)?.replaceAll('_', ' '),
				value : service?.category,
			})),
		);
		setSubCategoryOptions(
			services?.map((service) => ({
				label : startCase(service?.sub_category)?.replaceAll('_', ' '),
				value : service?.sub_category,
			})),
		);

		const branchIds = (services || []).map(
			(service) => service?.cogoport_office_id,
		);

		if (!isEmpty(branchIds)) {
			const BRANCHES = [];

			branchIds.forEach((id) => {
				(officeLocations || []).forEach((location) => {
					if (id === JSON.parse(location.value)?.branchId) {
						if (!BRANCHES.includes(location)) {
							BRANCHES.push(location);
						}
					}
				});
			});
			setBranchOptions([...BRANCHES]);
		}

		setFormData((prev) => ({
			...prev,
			vendorName         : BUSINESS_NAME,
			registrationNumber : REGISTRATION_NUMBER,
			vendorID           : VENDOR_ID,
			vendorSerialId     : SERIAL_ID,
			vendorData         : obj,
		}));
	};

	const handleCategoryChange = (val, obj) => {
		setFormData((prev) => ({
			...prev,
			expenseCategory : obj?.id,
			categoryName    : obj?.categoryName,
		}));
	};

	return (
		<div style={{ marginTop: '-30px' }}>
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
					handleVendorChange,
					handleCategoryChange,
				})}
				filters={formData}
				setFilters={setFormData}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;