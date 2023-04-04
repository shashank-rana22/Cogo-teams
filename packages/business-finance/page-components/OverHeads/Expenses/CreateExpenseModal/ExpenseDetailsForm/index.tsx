import { startCase, getMonth } from '@cogoport/utils';
import React, { useEffect } from 'react';

import Filter from '../../../../commons/Filters';
import { months } from '../../../constants/months';
import { nonRecurringExpenseDetails } from '../../../Controls/nonRecurringExpenseDetails';
import { recurringExpenseDetails } from '../../../Controls/recurringExpenseDetails';
import { officeLocations } from '../../../utils/officeLocations';
import useListCogoEntities from '../../hooks/useListCogoEntities';

interface ObjInt {
	category?:string,
	sub_category?:string,
	cogoport_office_id?:string | number,
	cogo_entity_id?:string,
}

interface VendorObject {
	services?: ObjInt[],
	business_name?:string,
	registration_number?:string | number,
	id?:string | number,
	serial_id?: number | string,
}

interface FormData {
	transactionDate?: Date | number,
	vendorData?:any,
	vendorName?:string,
	invoiceDate?:Date,
	periodOfTransaction?:string,
	entityObject?:object,
	registrationNumber?:number | string,
	expenseCategory?:string,
	expenseSubCategory?:string,
	branch?:any,
	paymentMode?:string,
	payableAmount?:string | number,
	currency?:string,
	repeatEvery?:string,
	startDate?:Date,
	endDate?:Date,
	agreementNumber?:number | string,
	description?:string,
	uploadedInvoice?:string[],
}
interface Props {
	formData?:FormData,
	setFormData?:(p: object) => void,
	createExpenseType?:string,
	categoryOptions?:object[],
	setCategoryOptions?:(p: object) => void,
	setSubCategoryOptions?:(p: object) => void,
	setBranchOptions?:(p: object) => void,
	setEntityOptions?:(p: object) => void,
	subCategoryOptions?:object[],
	branchOptions?:object[],
	entityOptions?:object[],
	setIsFormValidated?:(p:boolean)=>void,
}

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
}:Props) {
	const {
		transactionDate:date,
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
			setFormData((prev:object) => ({ ...prev, periodOfTransaction: months[getMonth(date) + 1] }));
		} else {
			setFormData((prev:object) => ({ ...prev, periodOfTransaction: null }));
		}
	}, [date, setFormData]);

	useEffect(() => {
		// calling list_cogo_entities and setting entity options
		if (entityList?.length > 0) {
			const entities = [];
			(entityList || []).forEach((entity) => {
				const { id, entity_code:entityCode, business_name:name } = entity || {};
				entities.push({
					label : `${entityCode}-${name}`,
					value : id,
				});
			});
			setEntityOptions([...entities]);
		}
	}, [entityList, setEntityOptions]);

	useEffect(() => {
		// Validations to ensure that all inputs are filled before moving to next page
		if (createExpenseType === 'nonRecurring') {
			const nonRecurringValidated = date
			&& vendorName
			&& invoiceDate
			&& periodOfTransaction
			&& entityObject
			&& registrationNumber
			&& expenseCategory
			&& expenseSubCategory
			&& branch
			&& paymentMode;
			if (nonRecurringValidated) {
				setIsFormValidated(true);
			} else {
				setIsFormValidated(false);
			}
		}
		if (createExpenseType === 'recurring') {
			const recurringValidated = vendorName
			&& registrationNumber
			&& expenseCategory
			&& expenseSubCategory
			&& entityObject
			&& payableAmount
			&& currency
			&& repeatEvery
			&& startDate
			&& endDate
			&& branch
			&& agreementNumber
			&& description
			&& uploadedInvoice?.length > 0;
			if (recurringValidated) {
				setIsFormValidated(true);
			} else {
				setIsFormValidated(false);
			}
		}
	}, [date,
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
		uploadedInvoice]);

	let expenseControls:any;
	if (createExpenseType === 'recurring') {
		expenseControls = recurringExpenseDetails;
	} else if (createExpenseType === 'nonRecurring') {
		expenseControls = nonRecurringExpenseDetails;
	}

	const handleVendorChange = (obj:VendorObject) => {
		setCategoryOptions(obj?.services?.map((service) => (
			{
				label : startCase(service?.category)?.replaceAll('_', ' '),
				value : service?.category,
			}
		)));
		setSubCategoryOptions(obj?.services?.map((service) => ({
			label : startCase(service?.sub_category)?.replaceAll('_', ' '),
			value : service?.sub_category,
		})));

		const branchIds = (obj?.services || []).map((service) => service?.cogoport_office_id);

		if (branchIds?.length > 0) {
			const branches = [];

			branchIds.forEach((id) => {
				(officeLocations || []).forEach((location) => {
					if (id === JSON.parse(location.value)?.branchId) {
						branches.push(location);
					}
				});
			});
			setBranchOptions([...branches]);
		}

		setFormData((prev:object) => ({
			...prev,
			vendorName         : obj?.business_name,
			registrationNumber : obj?.registration_number,
			vendorID           : obj?.id,
			vendorSerialId     : obj?.serial_id,
			vendorData         : obj,
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
				})}
				filters={formData}
				setFilters={setFormData}
			/>
		</div>
	);
}

export default ExpenseDetailsForm;
