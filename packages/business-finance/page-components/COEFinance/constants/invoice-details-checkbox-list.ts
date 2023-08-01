import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

function invoiceDetailsRejectCheckboxList(
	{
		billNumber,
		billDate,
		status,
		placeOfSupply,
	},
) {
	return [
		{ name: 'Invoice Number', value: 'Invoice Number', label: `Invoice Number - ${billNumber}` },
		{
			name  : 'Invoice Date',
			value : 'Invoice Date',
			label : `Invoice Date - ${formatDate({
				date       : billDate,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yyyy'],
				formatType : 'date',
			})}`,
		},
		{ name: 'Status', value: 'Status', label: `Status - ${startCase(status)}` },
		{ name: 'Place Of Supply', value: 'Place Of Supply', label: `Place Of Supply - ${placeOfSupply}` },
		{ name: 'Bill Type', value: 'Bill Type', label: 'Bill Type' },
		{ name: 'Additional charge', value: 'Additional charge', label: 'Additional charge' },
		{ name: 'Tax Mismatch', value: 'Tax Mismatch', label: 'Tax Mismatch' },
		{ name: 'Double Invoice', value: 'Double Invoice', label: 'Double Invoice' },
	];
}
export default invoiceDetailsRejectCheckboxList;
