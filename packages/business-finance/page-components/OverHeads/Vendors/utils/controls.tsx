const Controls = {
	KYC_STATUS: {
		value       : 'KYC_STATUS',
		placeholder : 'KYC Status',
		options     : [
			{
				label : 'Verified',
				value : 'VERIFIED',
			},
			{
				label : 'Rejected',
				value : 'REJECTED',
			},
			{
				label : 'Pending from user',
				value : 'PENDING_FROM_USER',
			},
			{
				label : 'Pending Verification',
				value : 'PENDING_VERIFICATION',
			},
		],
	},
	CATEGORY: {
		value       : 'CATEGORY',
		placeholder : 'Category',
		options     : [
			{
				label : 'Rent',
				value : 'RENT',
			},
			{
				label : 'Office maintenance',
				value : 'OFFICE_MAINTENANCE',
			},
			{
				label : 'Business Expenses',
				value : 'BUSINESS_EXPENSES',
			},
			{
				label : 'Internet and communication ',
				value : 'INTERNET_AND_COMMUNICATION',
			},
			{
				label : 'Professional Services Expenses',
				value : 'PROFESSIONAL_SERVICES_EXPENSES',
			},
			{
				label : 'Miscellaneous Expenses',
				value : 'MISCELLANEOUS_EXPENSES',
			},
		],
	},
};

export default Controls;
