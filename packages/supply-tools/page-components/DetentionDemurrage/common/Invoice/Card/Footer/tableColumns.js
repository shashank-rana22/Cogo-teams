import formatAmount from '@cogoport/globalization/utils/formatAmount';

const DEFAULT_NUMBER = 0;

const getFormatAmount = (amount) => formatAmount({
	amount,
	options: {
		style: 'decimal',
	},
});

const getFormatAmountWithCurrency = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

const tableColumns = [
	{ Header: ' ', accessor: (r) => r.name || '-' },
	{ Header: 'Alias Name', accessor: (r) => r.alias || '-' },
	{ Header: 'Currency', accessor: (r) => r.currency || '-' },
	{ Header: 'Rate', accessor: (r) => getFormatAmount(r?.price_discounted || DEFAULT_NUMBER) },
	{ Header: 'Quantity', accessor: (r) => getFormatAmount(r?.quantity || DEFAULT_NUMBER) },
	{ Header: 'Discount', accessor: (r) => getFormatAmount(r?.discount_price || DEFAULT_NUMBER) },
	{ Header: 'Exc. Rate', accessor: (r) => getFormatAmount(r?.exchange_rate || DEFAULT_NUMBER) },
	{
		Header   : 'Tax Amt.',
		accessor : (r) => `${getFormatAmountWithCurrency(
			r?.tax_price_discounted,
			r?.currency,
		)} (${r?.tax_percent || DEFAULT_NUMBER}%)`,
	},
	{
		Header   : 'Amt. with Tax',
		accessor : (r) => getFormatAmountWithCurrency(r?.tax_total_price_discounted || DEFAULT_NUMBER, r?.currency),
	},
];

export default tableColumns;
