import { MONTH_OPTIONS } from '../constants/MONTH_OPTIONS';

import styles from './styles.module.css';

interface FormDataInterface {
	registrationNumber?: string,
	entityObject?:{ id?:string },
	periodOfTransaction?:string,
	vendorName?:string,
}

interface EntityInt {
	id?:string | number,
	entity_code?:string,
	business_name?:string
}

interface Props {
	formData: FormDataInterface,
	setFormData: (obj:any)=>void,
	categoryOptions: object[],
	subCategoryOptions:object[],
	setCategoryOptions: (obj:any)=>void,
	setSubCategoryOptions:(obj:any)=>void,
	branchOptions: object,
	setBranchOptions: (obj:any)=>void,
	entityList: EntityInt[],
	entityOptions: object[],
	setEntityOptions: (obj:any)=>void,
	handleVendorChange?:(obj:any)=>void,
}

export const nonRecurringExpenseDetails = ({
	formData,
	setFormData,
	categoryOptions,
	subCategoryOptions,
	branchOptions,
	entityList,
	entityOptions,
	handleVendorChange = () => {},
}:Props) => {
	const handleEntityChange = (e:number | string) => {
		const entityData = entityList?.filter((entityItem) => entityItem.id === e)?.[0];
		setFormData({
			...formData,
			entityObject: entityData,
		});
	};

	return [
		{
			span    : 12,
			groupBy : [
				{
					name           : 'vendorName',
					label          : 'Vendor Name',
					type           : 'asyncSelect',
					asyncKey       : 'list_vendors',
					params         : { filters: { kyc_status: 'verified' } },
					value          : formData?.vendorName,
					onChange       : (item:any, obj:object) => handleVendorChange(obj),
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Vendor name',
					span           : 2.5,
					initialCall    : false,
					className      : styles.form_element,
				},
				{
					name                  : 'invoiceDate',
					label                 : 'Invoice Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 2,
				},
				{
					name                  : 'transactionDate',
					label                 : 'Transaction Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : false,
					span                  : 2,
				},
				{
					name           : 'periodOfTransaction',
					label          : 'Period Of Transaction',
					type           : 'select',
					disabled       : true,
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Select Month',
					span           : 2,
					value          : formData?.periodOfTransaction,
					onChange       : (month:string) => setFormData({ ...formData, periodOfTransaction: month }),
					options        : MONTH_OPTIONS,
					className      : styles.input_width,
				},
				{
					name           : 'cogoEntity',
					label          : 'Cogo Entity',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Entity',
					span           : 2,
					options        : entityOptions,
					value          : formData?.entityObject?.id,
					onChange       : (e:any) => handleEntityChange(e),
					className      : styles.input_width,
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name        : 'registrationNumber',
					label       : 'PAN',
					type        : 'textarea',
					value       : formData?.registrationNumber || null,
					style       : { borderRadius: '4px', height: '40px', width: '180px', padding: '7px' },
					placeholder : 'Autofilled PAN',
					span        : 2.4,
				},
				{
					name           : 'expenseCategory',
					label          : 'Expense Category',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Category',
					span           : 2,
					className      : styles.input_width,
					options        : categoryOptions,
				},
				{
					name           : 'expenseSubCategory',
					label          : 'Expense Sub-Category',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Sub-Category',
					span           : 2,
					className      : styles.input_width,
					options        : subCategoryOptions,
				},
				{
					name           : 'branch',
					label          : 'Branch',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2,
					className      : styles.input_width,
					options        : branchOptions,
				},
				{
					name           : 'paymentMode',
					label          : 'Payment Mode',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					style          : { width: '140px' },
					span           : 2,
					options        : [
						{ label: 'Pay Run', value: 'payrun' },
					],
				},
			],

		},
	];
};
