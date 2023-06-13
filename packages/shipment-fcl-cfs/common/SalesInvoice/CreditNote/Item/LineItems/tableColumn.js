import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getServiceNameforTableColumn from '../../../helpers/getServiceNameforTableColumn';

const ZERO_VALUE = 0;

export const tableColumn = ({ serviceItem = {} }) => {
	const serviceName = getServiceNameforTableColumn(serviceItem?.service_type, serviceItem?.trade_type);

	return [
		{
			label  : serviceName,
			render : (item) => item?.name || '-',
			span   : 3,
		},
		{
			label  : 'Currency',
			render : (item) => item?.currency || '-',
			span   : 1.2,
		},
		{
			label  : 'Rate',
			render : (item) => formatAmount({
				amount   : item?.price_discounted || ZERO_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1.2,
		},
		{
			label  : 'Quantity',
			render : (item) => item?.quantity || ZERO_VALUE,
			span   : 1.2,
		},
		{
			label  : 'Discount',
			render : (item) => formatAmount({
				amount   : item?.discount_price || ZERO_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1.2,
		},

		{
			label  : 'Exc. Rate',
			render : (item) => formatAmount({
				amount   : item?.exchange_rate || ZERO_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'decimal',
					maximumFractionDigits : 2,
				},
			}),
			span: 1.2,
		},
		{
			label  : 'Tax Amt.',
			render : (item) => `${formatAmount({
				amount   : item?.tax_price_discounted || ZERO_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})} (${item?.tax_percent || ZERO_VALUE}%)`,

			span: 1.5,
		},
		{
			label  : 'Amt. with Tax',
			render : (item) => formatAmount({
				amount   : item?.tax_total_price_discounted || ZERO_VALUE,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			}),
			span: 1.5,
		},
	];
};
