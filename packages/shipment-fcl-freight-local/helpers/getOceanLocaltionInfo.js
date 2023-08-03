import { isEmpty } from '@cogoport/utils';

export const getOceanLocationInfo = (primary_service, trade_type) => {
	let origin_port = '';
	let destination_port = '';

	if (trade_type === 'import') {
		if (!isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port_of_loading;
			destination_port = primary_service?.port;
		} else {
			origin_port = primary_service?.port;
		}
	}

	if (trade_type === 'export') {
		if (!isEmpty(primary_service?.port_of_loading)) {
			origin_port = primary_service?.port;
			destination_port = primary_service?.port_of_loading;
		} else {
			origin_port = primary_service?.port;
		}
	}

	return {
		origin_port, destination_port,
	};
};
