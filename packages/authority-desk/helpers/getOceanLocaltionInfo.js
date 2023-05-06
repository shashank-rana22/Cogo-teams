import { isEmpty } from '@cogoport/utils';

const localServices = ['fcl_freight_local_service'];
export const getOceanLocationInfo = (primary_service, trade_type) => {
	const service_type = primary_service?.service_type;

	let origin_port = primary_service?.origin_port;
	let destination_port = primary_service?.destination_port;

	if (localServices.includes(service_type)) {
		if (trade_type === 'import' && !isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port_of_loading;
			destination_port = primary_service?.port;
		} else if (trade_type === 'import' && isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port;
			destination_port = primary_service?.port_of_loading;
		} else if (trade_type === 'export' && !isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port;
			destination_port = primary_service?.port_of_loading;
		} else if (trade_type === 'export' && isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port_of_loading;
			destination_port = primary_service?.port;
		}
	}

	return {
		origin_port, destination_port,
	};
};
