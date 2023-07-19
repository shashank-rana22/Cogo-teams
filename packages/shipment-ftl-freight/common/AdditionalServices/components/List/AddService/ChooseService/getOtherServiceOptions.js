import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const getOtherServiceOptions = ({
	shipment_data = {},
	serviceOptions = [],
}) => {
	let newOptions = serviceOptions;

	const servicesList = (shipment_data?.all_services || []).filter(
		(service) => service.service_type !== 'subsidiary_service',
	) || [];
	if (servicesList[GLOBAL_CONSTANTS.zeroth_index]?.truck_number) {
		newOptions = servicesList.map((service) => ({
			label: `FTL Freight ${
				service?.truck_number ? `(${service?.truck_number})` : ''
			}`,
			value: `${service?.service_type}?${service?.id}`,
		}));
	} else {
		newOptions = [
			{
				label : 'FTL Freight',
				value : `${servicesList[GLOBAL_CONSTANTS.zeroth_index]
					.service_type}?${servicesList[GLOBAL_CONSTANTS.zeroth_index].id}`,
			},
		];
	}
	return newOptions;
};
