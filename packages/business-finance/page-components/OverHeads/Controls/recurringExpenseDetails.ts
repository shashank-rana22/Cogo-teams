import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';

import styles from './styles.module.css';

interface FormDataInterface {
	registrationNumber?: string,
	entityObject?:{ id?:string },
	periodOfTransaction?:string,
	vendorName?:string,
	expenseCategory?:string,
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
	handleVendorChange:(obj:any)=>void,
}

export const recurringExpenseDetails = ({
	formData,
	setFormData,
	categoryOptions,
	subCategoryOptions,
	branchOptions,
	entityList,
	entityOptions,
	handleVendorChange = () => {},
}:Props) => {
	const handleEntityChange = (e:string | number) => {
		const entityData = (entityList || []).filter((entityItem) => entityItem.id === e)?.[0];
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
					span           : 2.2,
					initialCall    : false,
					style          : { width: '164px' },
				},
				{
					name        : 'registrationNumber',
					label       : 'PAN',
					type        : 'textarea',
					value       : formData.registrationNumber || null,
					className   : styles.pan_area,
					placeholder : 'Autofilled PAN',
					span        : 2.2,
				},
				{
					name           : 'expenseCategory',
					label          : 'Expense Category',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Category',
					value          : formData?.expenseCategory,
					span           : 2.2,
					options        : categoryOptions,
					style          : { width: '164px' },
				},
				{
					name           : 'expenseSubCategory',
					label          : 'Expense Sub-Category',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Sub-Category',
					span           : 2.2,
					options        : subCategoryOptions,
					style          : { width: '168px' },
				},
				{
					name           : 'cogoEntity',
					label          : 'Cogo Entity',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Entity',
					span           : 2.2,
					options        : entityOptions,
					value          : formData?.entityObject?.id,
					onChange       : (e:any) => handleEntityChange(e),
					style          : { width: '164px' },
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name               : 'payableAmount',
					label              : 'Payable Amount',
					type               : 'input',
					prefix             : null,
					onlyNumbersAllowed : true,
					style              : { borderRadius: '4px', width: '164px', height: '40px', padding: '7px' },
					span               : 2.2,
					size               : 'md',
				},
				{
					name    : 'currency',
					label   : 'Currency',
					type    : 'select',
					span    : 2.2,
					style   : { borderRadius: '4px', width: '164px' },
					size    : 'md',
					options : getCurrencyOptions(),
				},
				{
					name           : 'repeatEvery',
					label          : 'Repeat Every',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					style          : { width: '164px' },
					span           : 2.2,
					options        : [
						{ label: 'Week', value: 'WEEK' },
						{ label: '2 Weeks', value: 'TWO_WEEKS' },
						{ label: 'Month', value: 'MONTH' },
						{ label: 'Quarter', value: 'QUARTER' },
						{ label: 'Year', value: 'YEAR' },
					],
				},
				{
					name                  : 'startDate',
					label                 : 'Start Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 2.2,
				},
				{
					name                  : 'endDate',
					label                 : 'End Date',
					type                  : 'datepicker',
					isPreviousDaysAllowed : true,
					span                  : 2.2,
				},
			],
		},
		{
			span    : 12,
			groupBy : [
				{
					name           : 'branch',
					label          : 'Branch',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2.2,
					options        : branchOptions,
					style          : { width: '164px' },
				},
				{
					name      : 'agreementNumber',
					label     : 'Agreement Number',
					type      : 'textarea',
					className : styles.agreement,
					span      : 2,
					size      : 'md',
				},
			],
		},
		{
			name      : 'description',
			label     : 'Description',
			type      : 'textarea',
			className : styles.description,
			span      : 12,
			size      : 'md',
		},
		{
			name          : 'uploadedInvoice',
			label         : 'Upload Agreement',
			type          : 'fileUploader',
			multiple      : true,
			draggable     : true,
			loading       : true,
			dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
			style         : { width: '410px' },
			span          : 12,
		},
	];
};
