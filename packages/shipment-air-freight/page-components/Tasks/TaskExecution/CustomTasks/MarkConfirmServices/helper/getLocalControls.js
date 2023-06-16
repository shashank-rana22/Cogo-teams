import { isEmpty } from '@cogoport/utils';

const getLocalControls = (service_type, shipment_data, formattedRate) => {
	const value = 	(shipment_data?.all_services || []).find(
		(serviceObj) => serviceObj?.service_type.includes('air_freight_local_service'),
	);

	const controlMapping = {
		air_freight_service: [
			{
				type     : 'async-select',
				asyncKey : 'list_operators',
				params   : {
					filters: { operator_type: 'airline', status: 'active' },
				},
				caret         : true,
				span          : 5,
				name          : 'airline_id',
				value         : isEmpty(formattedRate) && value?.airline_id,
				subType       : 'select',
				label         : 'Please select airline (Air Local)',
				placeholder   : 'Search airline...',
				commodityType : 'air_freight',
				rules         : { required: 'Air Line Details is Required' },
			},
			{
				name           : 'service_provider_id',
				type           : 'select',
				span           : 5,
				label          : 'Service Provider (Air Local)',
				value          : isEmpty(formattedRate) && value?.service_provider_id,
				optionsListKey : 'verified-service-providers',
				placeholder    : 'Select Service Provider',
				rules          : { required: 'Service Provider is Required' },
			},
		],
	};

	return controlMapping[service_type] || [];
};

export default getLocalControls;
