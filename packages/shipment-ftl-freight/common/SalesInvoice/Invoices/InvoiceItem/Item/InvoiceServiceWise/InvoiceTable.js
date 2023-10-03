import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getServiceNameforTableColumn from '../../../../helpers/getServiceNameforTableColumn';

const DEFAULT_VALUE = 0;

export const invoiceTable = (serviceItem = {}) => {
	const { trade_type = '', truck_number = '' } = serviceItem || {};

	const serviceName = getServiceNameforTableColumn(serviceItem?.service_type, trade_type, truck_number);

	return [
		{
			label  : serviceName,
			render : (item) => item?.name || '-',
			span   : 2,
		},
		{
			label  : 'Alias Name',
			render : (item) => item?.alias || '-',
			span   : 1,
		},
		{
			label  : 'Currency',
			render : (item) => item?.currency || '-',
			span   : 1,
		},
		{
			label  : 'Rate',
			render : (item) => formatAmount({
				amount   : item?.price_discounted,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1,
		},
		{
			label  : 'Quantity',
			render : (item) => formatAmount({
				amount   : item?.quantity,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1,
		},
		{
			label  : 'Discount',
			render : (item) => formatAmount({
				amount   : item?.discount_price,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1,
		},

		{
			label  : 'Exc. Rate',
			render : (item) => formatAmount({
				amount   : item?.exchange_rate,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1,
		},
		{
			label  : 'Tax Amt.',
			render : (item) => `${formatAmount({
				amount   : item?.tax_price_discounted || DEFAULT_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})} (${item?.tax_percent || DEFAULT_VALUE}%)`,

			span: 1,
		},
		{
			label  : 'Amt. with Tax',
			render : (item) => formatAmount({
				amount   : item?.tax_total_price_discounted || DEFAULT_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),

			span: 1,
		},
	];
};
