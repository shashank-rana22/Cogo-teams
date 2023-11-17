import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getControls = () => [
	{
		name    : 'category',
		label   : 'Expense Category',
		type    : 'select',
		options : [{ label: 'Hotel Stay', value: 'HOTEL_STAY' },
			{ label: 'Local Conveyance', value: 'LOCAL_CONVEYANCE' },
			{ label: 'Other', value: 'OTHER' },
			{ label: 'Per Diem', value: 'PER_DIEM' },
			{ label: 'Outstation Local Conveyance', value: 'OCL' },
			{ label: 'Outstation Meals & Entertainment Allowance', value: 'OMEC' },
			{ label: 'Outstation Travel Expense', value: 'OTC' },
		],
		placeholder : 'Category',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'description',
		label       : 'Expense Name',
		type        : 'input',
		placeholder : 'Type Name',
		rules       : { required: 'This is required' },
	},
	{
		name                  : 'submitted_on',
		label                 : 'Date of Expense',
		type                  : 'date-picker',
		placeholder           : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		isPreviousDaysAllowed : true,
		rules                 : { required: 'This is required' },
	},
	{
		name        : 'amount',
		label       : 'Amount',
		type        : 'input',
		placeholder : 'Type here',
		rules       : { required: 'This is required' },
	},
	{
		name        : 'attachment',
		label       : 'Attachment',
		type        : 'fileUpload',
		placeholder : 'Enter your score',
		rules       : { required: 'This is required' },
	},
];

export default getControls;
