import { ControlProps } from '../../../../commons/Interfaces';

export const recurringExpenseDetails : ControlProps[] = [
	{
		span    : 12,
		groupBy : [
			{
				name           : 'cogoEntity',
				label          : 'Cogo Entity*',
				type           : 'select',
				isClearable    : true,
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
				name           : 'vendorName',
				label          : 'Vendor Name*',
				type           : 'select',
				isClearable    : true,
				multiple       : false,
				defaultOptions : false,
				placeholder    : 'Category',
				span           : 2,
				options        : [

				],
			},
			{
				name        : 'pan',
				label       : 'PAN',
				type        : 'textarea',
				placeholder : 'Autofilled PAN',
				span        : 2,
			},
			{
				name           : 'paymentType',
				label          : 'Payment Type*',
				type           : 'select',
				isClearable    : true,
				multiple       : false,
				defaultOptions : false,
				placeholder    : 'Type',
				span           : 2,
				options        : [
					{ label: 'Fixed Amount', value: 'fixed' },
					{ label: 'Variable Amount', value: 'variable' },
				],
			},
			{
				name           : 'expenseCategory',
				label          : 'Expense Category*',
				type           : 'select',
				isClearable    : true,
				multiple       : false,
				defaultOptions : false,
				placeholder    : 'Category',
				span           : 2,
				options        : [
					{
						label : 'Facility Rent',
						value : 'Facility Rent',
					},
					{
						label : 'Equipment on Rent',
						value : 'Equipment on Rent',
					},
					{
						label : 'Software Expense',
						value : 'Software Expense',
					},
					{
						label : 'Salary - Contract',
						value : 'Salary - Contract',
					},
					{
						label : 'Facility repairs and maintenance',
						value : 'Facility repairs and maintenance',
					},
					{
						label : 'Equipment Repair & Maintenance',
						value : 'Equipment Repair & Maintenance',
					},
					{
						label : 'House Keeping & Other Office Expense',
						value : 'House Keeping & Other Office Expense',
					},
					{
						label : 'Courier Charges',
						value : 'Courier Charges',
					},
					{
						label : 'Communication Charges',
						value : 'Communication Charges',
					},
					{
						label : 'Electricity',
						value : 'Electricity',
					},
					{
						label : 'Staff Welfare expenses',
						value : 'Staff Welfare expenses',
					},
					{
						label : 'Travelling Expenses',
						value : 'Travelling Expenses',
					},
					{
						label : 'Printing and stationery',
						value : 'Printing and stationery',
					},
					{
						label : 'Lodging & Boarding Expenses',
						value : 'Lodging & Boarding Expenses',
					},
					{
						label : 'Legal Fees',
						value : 'Legal Fees',
					},
					{
						label : 'Professional Fees',
						value : 'Professional Fees',
					},
					{
						label : 'Recruitment Charges',
						value : 'Recruitment Charges',
					},
					{
						label : 'Security Charges',
						value : 'Security Charges',
					},
					{
						label : 'Other Expense',
						value : 'Other Expense',
					},
				],
			},
		],
	},
];
