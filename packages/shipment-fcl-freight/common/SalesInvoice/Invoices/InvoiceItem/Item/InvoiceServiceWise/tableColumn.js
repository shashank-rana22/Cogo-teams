import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase, isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

// import { ShipmentDetailContext } from '../../../../../../../commons/Context';

export const tableColumn = (serviceItem = {}) => {
	// const [contextValues] = useContext(ShipmentDetailContext);
	// const { shipment_data } = contextValues;

	// const mainService = `${shipment_data?.shipment_type}_service`;

	let ServiceName;

	// if (serviceItem?.service_type === 'ftl_freight_service') {
	// 	ServiceName = isEmpty(serviceItem?.truck_number)
	// 		? 'Truck Number'
	// 		: `Truck Number: ${serviceItem?.truck_number || ''}`;
	// } else if (serviceItem?.service_type === 'ltl_freight_service') {
	// 	ServiceName = isEmpty(serviceItem?.lr_number)
	// 		? 'LR Number'
	// 		: `LR Number: ${serviceItem?.lr_number || ''}`;
	// } else if (
	// 	serviceItem?.service_type === 'haulage_freight_service'
	// 	&& serviceItem?.display_name === 'trailer_freight_service'
	// ) {
	// 	ServiceName =			serviceItem?.trailer_number === null
	// 		? 'Trailer Number'
	// 		: `Trailer Number: ${serviceItem?.trailer_number}`;
	// } else {
	// 	ServiceName =			serviceItem?.service_type === mainService
	// 		? startCase(serviceItem?.display_name)
	// 		: (serviceItem?.trade_type === 'import'
	// 					&& `Destination ${startCase(serviceItem?.display_name)}`)
	// 			  || (serviceItem?.trade_type === 'export'
	// 					&& `Origin ${startCase(serviceItem?.display_name)}`)
	// 			  || startCase(serviceItem?.display_name);
	// }

	return [
		{
			label  : ServiceName,
			render : (item) => item?.name || '-',
			span   : 2.5,
		},
		{
			label  : 'Alias Name',
			render : (item) => item?.alias || '-',
			span   : 1.5,
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
			render : (item) => Number(item?.quantity || 0).toLocaleString('en-IN') || 0,
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
