import formatAmount from '@cogoport/globalization/utils/formatAmount';

const serviceWiseColumns = [
	{
		Header   : 'OPEN INVOICES',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.totalOpenInvoiceAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : 'NOT DUE',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceNotDueAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '1-30 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceThirtyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '31-60 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceSixtyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '61-90 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceNinetyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},

	},
	{
		Header   : '91-180 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceOneEightyAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
	{
		Header   : '181-365 DAYS',
		accessor : (row) => {
			<div>
				{formatAmount({
					amount   : row?.invoiceThreeSixtyFiveAmount,
					currency : row?.ledCurrency,
				})}
			</div>;
		},
	},
];

export default serviceWiseColumns;
