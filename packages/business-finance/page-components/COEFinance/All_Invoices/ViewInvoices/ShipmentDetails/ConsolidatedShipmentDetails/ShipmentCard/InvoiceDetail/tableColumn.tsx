import { startCase } from '@cogoport/utils';

export const tableColumn = () => [
	{
		key    : 'invoice_number',
		label  : 'Invoice Number',
		render : (item) => item?.invoice_number,
		span   : 2.5,
	},
	{
		key    : 'organization_name',
		label  : 'Organization Name',
		render : (item) => item?.billing_address?.business_name,
		span   : 2.5,
	},
	{
		key    : 'invocie_value',
		label  : 'Invoice Value',
		render : (item) => `${item?.invoice_currency} ${item?.invoice_total}`,
		span   : 2.5,
	},
	{
		key    : 'payment_mode',
		label  : 'Payment Mode',
		render : (item) => startCase(item?.payment_mode),
		span   : 2.5,
	},
	{
		key    : 'status',
		label  : 'Status',
		render : (item) => startCase(item?.status),
		span   : 1,
	},
];
