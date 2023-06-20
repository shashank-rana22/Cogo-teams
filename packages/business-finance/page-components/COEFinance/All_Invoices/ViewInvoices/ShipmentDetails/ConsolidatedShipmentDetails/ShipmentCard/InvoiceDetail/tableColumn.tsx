import startCase from '@cogoport/utils/src/utilities/startCase';

export const tableColumn = () => [
	{
		label  : 'Invoice Number',
		render : (item) => item?.invoice_number,
		span   : 2.5,
	},
	{
		label  : 'Organization Name',
		render : (item) => item?.billing_address?.business_name,
		span   : 2.5,
	},
	{
		label  : 'Invoice Value',
		render : (item) => `${item?.invoice_currency} ${item?.invoice_total}`,
		span   : 2.5,
	},
	{
		label  : 'Payment Mode',
		render : (item) => startCase(item?.payment_mode),
		span   : 2.5,
	},
	{
		label  : 'Status',
		render : (item) => startCase(item?.status),
		span   : 1,
	},
];
