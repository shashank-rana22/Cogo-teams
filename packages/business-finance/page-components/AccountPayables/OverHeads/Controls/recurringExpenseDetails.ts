interface Props {
	filters: { repeatEvery?:string },
	setFilters: (obj)=>void,
}

export const recurringExpenseDetails = ({
	filters,
	setFilters,
}:Props) => [
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
				name           : 'vendorName',
				label          : 'Vendor Name*',
				type           : 'select',
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
				style       : { borderRadius: '4px' },
				placeholder : 'Autofilled PAN',
				span        : 2,
			},
			{
				name           : 'paymentType',
				label          : 'Payment Type*',
				type           : 'select',
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
	{
		span    : 12,
		groupBy : [
			{
				name           : 'expenseSubCategory',
				label          : 'Expense Sub-Category*',
				type           : 'select',
				multiple       : false,
				defaultOptions : false,
				placeholder    : 'Sub-Category',
				span           : 2,
				options        : [
				],
			},
			{
				name        : 'payableAmount',
				label       : 'Payable Amount*',
				type        : 'textarea',
				style       : { borderRadius: '4px' },
				placeholder : 'Amount',
				span        : 2,
			},
			{
				name           : 'repeatEvery',
				label          : 'Repeat Every*',
				type           : 'select',
				multiple       : false,
				defaultOptions : false,
				value          : filters?.repeatEvery,
				onChange       : (e:any) => setFilters({ ...filters, repeatEvery: e }),
				span           : 1,
				options        : [
					{ label: 'Week', value: 'week' },
					{ label: '2 Weeks', value: '2weeks' },
					{ label: 'Month', value: 'month' },
					{ label: 'Quarter', value: 'quarter' },
					{ label: 'Year', value: 'year' },
				],
			},
			{
				name  : 'startDate',
				label : 'Start Date*',
				type  : 'datepicker',
				span  : 1.5,
			},
			{
				name  : 'endDate',
				label : 'End Date*',
				type  : 'datepicker',
				span  : 1.5,
			},
			{
				name    : 'neverExpires',
				type    : 'checkboxGroup',
				options : [{ label: 'Never Expires', value: 'neverExpires', name: 'neverExpires' }],
				// onChange: disable end date
				span    : 1.8,
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
					{ label: 'Non - Pay Run', value: 'nonpPayrun' },
				],
			},
		],
	},
	{
		span    : 12,
		groupBy : [
			{
				name        : 'description',
				label       : 'Description',
				type        : 'textarea',
				placeholder : 'Remark here...',
				span        : 5,
				style       : { height: '100px', borderRadius: '4px', width: '410px' },
			},
			{
				name          : 'uploadedAgreement',
				label         : 'Upload Agreement*',
				type          : 'fileUploader',
				draggable     : true,
				loading       : true,
				dropareaProps : { heading: 'Upload your file here', subHeading: 'supports - jpeg, pdf, docx' },
				className     : 'file-uploader',
				style         : { width: '410px' },
				span          : 5,
				multiple      : false,
			},
		],
	},
];
