import { startCase } from '@cogoport/utils';

interface FiltersInterface {
	registrationNumber?: string,
}

interface Props {
	filters: FiltersInterface,
	setFilters: (obj)=>void,
	categoryOptions: object[],
	subCategoryOptions:object[],
	setCategoryOptions: (obj)=>void,
	setSubCategoryOptions:(obj)=>void,
}

export const nonRecurringExpenseDetails = ({
	filters, setFilters,
	categoryOptions, setCategoryOptions, subCategoryOptions, setSubCategoryOptions,
}:Props) => {
	const handleVendorChange = (obj) => {
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

		setFilters({
			...filters,
			vendorName         : obj?.business_name,
			registrationNumber : obj?.registration_number,
		});
	};

	return [
		{
			span    : 12,
			groupBy : [
				{
					name           : 'cogoEntity',
					label          : 'Cogo Entity*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Entity',
					span           : 2,
					options        : [
						{ value: '101', label: '101 - Cogo pvt ltd' },
						{ value: '201', label: '201 - Cogo pvt ltd' },
						{ value: '301', label: '301 - Cogo pvt ltd' },
						{ value: '401', label: '401 - Cogo pvt ltd' },
					],
				},
				{
					name  : 'invoiceDate',
					label : 'Invoice Date*',
					type  : 'datepicker',
					span  : 1.5,
				},
				{
					name  : 'transactionDate',
					label : 'Transaction Date*',
					type  : 'datepicker',
					span  : 1.5,
				},
				{
					name           : 'periodOfTransaction',
					label          : 'Period Of Transaction*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Select Month',
					span           : 2,
					options        : [
						{ value: 'January', label: 'January' },
						{ value: 'February', label: 'February' },
						{ value: 'March', label: 'March' },
						{ value: 'April', label: 'April' },
						{ value: 'May', label: 'May' },
						{ value: 'June', label: 'June' },
						{ value: 'July', label: 'July' },
						{ value: 'August', label: 'August' },
						{ value: 'September', label: 'September' },
						{ value: 'October', label: 'October' },
						{ value: 'November', label: 'November' },
						{ value: 'December', label: 'December' },
					],
				},
				{
					name           : 'vendorName',
					label          : 'Vendor Name*',
					type           : 'asyncSelect',
					asyncKey       : 'list_vendors',
					onChange       : (item, obj) => handleVendorChange(obj),
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Vendor name',
					span           : 2,
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
					value       : filters.registrationNumber || null,
					style       : { borderRadius: '4px' },
					placeholder : 'Autofilled PAN',
					span        : 2,
				},
				{
					name           : 'expenseCategory',
					label          : 'Expense Category*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Category',
					span           : 2,
					options        : categoryOptions,
				},
				{
					name           : 'expenseSubCategory',
					label          : 'Expense Sub-Category*',
					type           : 'select',
					multiple       : false,
					defaultOptions : false,
					placeholder    : 'Sub-Category',
					span           : 2,
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
					options        : [
						{ label: 'Mumbai', value: 'mumbai' },
						{ label: 'Gurgaon - PDC', value: 'gurgaon-pdc' },
						{ label: 'Gurgaon - Augusta Point', value: 'gurgaon-augusta-point' },
						{ label: 'Others', value: 'others' },
					],
				},
				{
					name           : 'paymentMode',
					label          : 'Payment Mode',
					type           : 'select',
					clearable      : true,
					multiple       : false,
					defaultOptions : false,
					span           : 2,
					options        : [
						{ label: 'Pay Run', value: 'payrun' },
					],
				},
			],

		},
	];
};
