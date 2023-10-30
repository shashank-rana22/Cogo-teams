import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import getServiceNameforTableColumn from '../../../helpers/getServiceNameforTableColumn';

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
				amount   : item?.price_discounted || GLOBAL_CONSTANTS.zeroth_index,
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
			render : (item) => item?.quantity || GLOBAL_CONSTANTS.zeroth_index,
			span   : 1.2,
		},
		{
			label  : 'Discount',
			render : (item) => formatAmount({
				amount   : item?.discount_price || GLOBAL_CONSTANTS.zeroth_index,
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
				amount   : item?.exchange_rate || GLOBAL_CONSTANTS.zeroth_index,
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
				amount   : item?.tax_price_discounted || GLOBAL_CONSTANTS.zeroth_index,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})} (${item?.tax_percent || GLOBAL_CONSTANTS.zeroth_index}%)`,

			span: 1.5,
		},
		{
			label  : 'Amt. with Tax',
			render : (item) => formatAmount({
				amount   : item?.tax_total_price_discounted || GLOBAL_CONSTANTS.zeroth_index,
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
