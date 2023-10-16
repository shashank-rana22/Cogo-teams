import { PAYMENT_OPTIONS } from '../../constants/REPEAT_FREQUENCY';

const Controls = {
	paymentStatus: {
		value       : 'paymentStatus',
		placeholder : 'Payment Status',
		options     : PAYMENT_OPTIONS,
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
