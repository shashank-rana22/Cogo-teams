import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getFormattedAmount from '../../../../../common/helpers/formatAmount';
import getServiceNameforTableColumn from '../../../../../helpers/getServiceNameforTableColumn';

const { zeroth_index } = GLOBAL_CONSTANTS;

const TWO = 2;
const SIX = 6;

export const invoiceTable = (serviceItem = {}) => {
	const serviceName = getServiceNameforTableColumn(serviceItem?.service_type, serviceItem?.trade_type);

	return [
		{
			label  : serviceName,
			render : (item) => item?.name || '-',
			span   : 2.0,
		},
		{
			label  : 'Alias Name',
			render : (item) => item?.alias || '-',
			span   : 1.0,
		},
		{
			label  : 'Currency',
			render : (item) => item?.currency || '-',
			span   : 1,
		},
		{
			label  : 'Rate',
			render : (item) => getFormattedAmount(item?.price_discounted, item?.currency, TWO),
			span   : 1,
		},
		{
			label  : 'Quantity',
			render : (item) => getFormattedAmount(item?.quantity, item?.currency, TWO),
			span   : 1,
		},
		{
			label  : 'Discount',
			render : (item) => getFormattedAmount(item?.discount_price, item?.currency, TWO),
			span   : 1,
		},

		{
			label  : 'Exc. Rate',
			render : (item) => getFormattedAmount(item?.exchange_rate, item?.currency, SIX),
			span   : 1,
		},
		{
			label: 'Tax Amt.',
			render:
			(item) => `${getFormattedAmount(item?.tax_price_discounted, item?.currency, TWO)} (${item?.tax_percent
				|| zeroth_index}%)`,
			span: 1,
		},
		{
			label  : 'Amt. with Tax',
			render : (item) => getFormattedAmount(item?.tax_total_price_discounted, item?.currency, TWO),
			span   : 1,
		},
	];
};
