import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

export const tableColumn = ({ serviceItem = {}, shipment_data = {} }) => {
	const mainService = `${shipment_data?.shipment_type}_service`;

	const serviceName =	serviceItem?.service_type === mainService
		? startCase(serviceItem?.service_type)
		: (serviceItem?.trade_type === 'import' && `Destination ${startCase(serviceItem?.service_type)}`)
				|| (serviceItem?.trade_type === 'export' && `Origin ${startCase(serviceItem?.service_type)}`)
				|| startCase(serviceItem?.service_type);

	return [
		{
			label  : serviceName,
			render : (item) => item?.name || '-',
			span   : 2,
		},
		{
			label  : 'Currency',
			render : (item) => item?.currency || '-',
			span   : 1,
		},
		{
			label  : 'Rate',
			render : (item) => Number(item?.price_discounted || 0).toLocaleString('en-IN') || 0,
			span   : 1,
		},
		{
			label  : 'Quantity',
			render : (item) => item?.quantity || 0,
			span   : 1,
		},
		{
			label  : 'Discount',
			render : (item) => Number(item?.discount_price || 0).toLocaleString('en-IN') || 'NA',
			span   : 1,
		},

		{
			label  : 'Exc. Rate',
			render : (item) => Number(item?.exchange_rate || 0).toLocaleString('en-IN') || 'NA',
			span   : 1,
		},
		{
			label  : 'Tax Amt.',
			render : (item) => `${formatAmount({
				amount   : item?.tax_price_discounted || 0,
				currency : item?.currency,
				options  : {
					style                 : 'currency',
					currencyDisplay       : 'code',
					maximumFractionDigits : 2,
				},
			})} (${item?.tax_percent || 0}%)`,

			span: 1.5,
		},
		{
			label  : 'Amt. with Tax',
			render : (item) => formatAmount({
				amount   : item?.tax_total_price_discounted || 0,
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
