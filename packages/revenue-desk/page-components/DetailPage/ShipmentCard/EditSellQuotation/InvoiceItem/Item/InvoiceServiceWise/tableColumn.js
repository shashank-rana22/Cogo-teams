import { startCase, isEmpty } from '@cogoport/utils';

export const tableColumn = (serviceItem, shipment_data) => {
	const mainService = `${shipment_data?.shipment_type}_service`;

	let ServiceName;

	if (serviceItem?.service_type === 'ftl_freight_service') {
		ServiceName = isEmpty(serviceItem?.truck_number)
			? 'Truck Number'
			: `Truck Number: ${serviceItem?.truck_number || ''}`;
	} else if (serviceItem?.service_type === 'ltl_freight_service') {
		ServiceName = isEmpty(serviceItem?.lr_number)
			? 'LR Number'
			: `LR Number: ${serviceItem?.lr_number || ''}`;
	} else if (
		serviceItem?.service_type === 'haulage_freight_service'
		&& serviceItem?.display_name === 'trailer_freight_service'
	) {
		ServiceName =			serviceItem?.trailer_number === null
			? 'Trailer Number'
			: `Trailer Number: ${serviceItem?.trailer_number}`;
	} else {
		ServiceName =			serviceItem?.service_type === mainService
			? startCase(serviceItem?.display_name)
			: (serviceItem?.trade_type === 'import'
						&& `Destination ${startCase(serviceItem?.display_name)}`)
				|| (serviceItem?.trade_type === 'export'
						&& `Origin ${startCase(serviceItem?.display_name)}`)
				|| startCase(serviceItem?.display_name);
	}

	return [
		{
			Header   : ServiceName,
			accessor : 'name',
		},
		{
			Header   : 'Alias Name',
			accessor : 'alias',
		},
		{
			Header   : 'Currency',
			accessor : 'currency',
		},
		{
			Header   : 'Rate',
			accessor : 'price',
		},
		{
			Header   : 'Quantity',
			accessor : 'quantity',
		},
		{
			Header   : 'Discount',
			accessor : 'discount_price',
		},

		{
			Header   : 'Exc. Rate',
			accessor : 'exchange_rate',
		},
		{
			Header   : 'Tax Amt.',
			accessor : 'tax_amt',
		},
		{
			Header   : 'Amt. with Tax',
			accessor : 'amt_with_tax',
		},
	];
};
