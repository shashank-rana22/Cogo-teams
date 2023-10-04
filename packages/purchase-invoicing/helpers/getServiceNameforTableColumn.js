import { startCase } from '@cogoport/utils';

export default function getServiceNameforTableColumn(service_type = '', trade_type = '') {
	const SERVICE_TYPE = startCase(service_type);

	if (service_type === 'fcl_freight_service') return SERVICE_TYPE;
	switch (trade_type) {
		case 'import':
			return `Destination ${SERVICE_TYPE}`;
		case 'export':
			return `Origin ${SERVICE_TYPE}`;
		default:
			return SERVICE_TYPE;
	}
}
