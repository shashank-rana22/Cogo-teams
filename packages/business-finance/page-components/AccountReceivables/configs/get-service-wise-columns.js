import formatAmount from '@cogoport/globalization/utils/formatAmount';

function ShowAmount({ item = {}, amountKey = '', currencyKey = '' }) {
	return (
		<div>
			{formatAmount({
				amount   : item?.[amountKey],
				currency : item?.[currencyKey],
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 0,
				},
			})}
		</div>
	);
}

const serviceWiseColumns = [
	{
		Header   : 'OPEN INVOICES',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="totalOpenInvoiceAmount" currencyKey="ledCurrency" />
		),
	},
	{
		Header   : 'NOT DUE',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceNotDueAmount" currencyKey="ledCurrency" />
		),
	},
	{
		Header   : '1-30 DAYS',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceThirtyAmount" currencyKey="ledCurrency" />
		),
	},
	{
		Header   : '31-60 DAYS',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceSixtyAmount" currencyKey="ledCurrency" />
		),
	},
	{
		Header   : '61-90 DAYS',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceNinetyAmount" currencyKey="ledCurrency" />
		),

	},
	{
		Header   : '91-180 DAYS',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceOneEightyAmount" currencyKey="ledCurrency" />
		),
	},
	{
		Header   : '181-365 DAYS',
		accessor : (row) => (
			<ShowAmount item={row} amountKey="invoiceThreeSixtyFiveAmount" currencyKey="ledCurrency" />
		),
	},
];

export default serviceWiseColumns;
