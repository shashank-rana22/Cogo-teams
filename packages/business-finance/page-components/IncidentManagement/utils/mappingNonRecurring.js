import formatAmount from '@cogoport/globalization/utils/formatAmount';

const mappingNonRecurring = ({ overheadConfirmationRequest }) => {
	const {
		invoiceNumber,
		subTotalAmount,
		taxTotalAmount,
		grandTotalAmount,
		ledgerGrandTotal,
		ledgerCurrency,
		billCurrency: currency,
		branchName,
		categoryName,
	} = overheadConfirmationRequest || {};
	const INCIDENT_MAPPING = [
		{
			key   : 'Invoice number',
			value : invoiceNumber,
		},
		{ key: 'Category Name', value: categoryName },
		{ key: 'Branch Name', value: branchName },
		{
			key   : 'SubTotal',
			value : formatAmount({
				amount  : subTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'TaxAmount',
			value : formatAmount({
				amount  : taxTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'GrandTotal',
			value : formatAmount({
				amount  : grandTotalAmount,
				currency,
				options : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
		{
			key   : 'Ledger GrandTotal',
			value : formatAmount({
				amount   : ledgerGrandTotal,
				currency : ledgerCurrency,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
		},
	];

	return { INCIDENT_MAPPING };
};

export default mappingNonRecurring;
