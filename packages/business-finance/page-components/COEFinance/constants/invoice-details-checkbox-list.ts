import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

function invoiceDetailsRejectCheckboxList(
	{
		billNumber = '',
		billDate = '',
		invoiceType = '',
		organizationName = '',
		remarks = 'No Remarks',
		urgencyTag = 'No Urgency Tag',
	},
) {
	return [
		{ name: 'Invoice Number', value: 'Invoice Number', label: `Invoice Number - ${billNumber}` },
		{ name: 'Invoice Type', value: 'Invoice Type', label: `Invoice Type - ${invoiceType}` },
		{ name: 'Supplier name', value: 'Supplier name', label: `Supplier Name - ${organizationName}` },
		{ name: 'Urgency Tag', value: 'Urgency Tag', label: `Urgency Tag - ${urgencyTag}` },
		{ name: 'Remarks', value: 'Remarks', label: `Remarks - ${remarks}` },
		{
			name  : 'Invoice Date',
			value : 'Invoice Date',
			label : `Invoice Date - ${formatDate({
				date       : billDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
				formatType : 'date',
			})}`,
		},
		{ name: 'Payment Due date', value: 'Payment Due date', label: 'Payment Due date -' },
	];
}
export default invoiceDetailsRejectCheckboxList;
