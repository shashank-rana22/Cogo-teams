import { isEmpty } from '@cogoport/utils';

export const extraLineItems = ({ serviceProvider = {}, shipment_data = {} }) => {
	const { shipment_type = '' } = shipment_data || {};
	const truckList = (serviceProvider?.service_charges || []).reduce((acc, item) => {
		if (item?.service_type === 'ftl_freight_service') {
			acc.push({
				label : item?.detail?.truck_number,
				value : `${item?.detail?.truck_number}:${item?.service_id}`,
			});
		}
		return acc;
	}, []);

	if (shipment_type === 'rail_domestic_freight') {
		return [
			{
				label : 'Container Number',
				span  : 3.6,
				key   : 'container_number',
			},
		];
	}
	if (shipment_type === 'ftl_freight' && !isEmpty(truckList)) {
		return [
			{
				name        : 'truck_number',
				key         : 'truck_number',
				type        : 'select',
				span        : 3.6,
				rules       : { required: 'Truck Number is Required' },
				options     : truckList,
				placeholder : 'Enter',
				label       : 'Truck Number',
			},
		];
	}
	return [];
};
