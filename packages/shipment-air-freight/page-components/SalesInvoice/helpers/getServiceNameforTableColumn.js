import { startCase } from '@cogoport/utils';

export default function getServiceNameforTableColumn(service_type = '', trade_type = '', primary_service_type = '') {
	if (service_type === 'air_freight_service') return startCase(service_type);
	switch (trade_type) {
		case 'import':
			return `Destination ${startCase(service_type)} 
			${service_type === 'subsidiary_service' ? `(${startCase(primary_service_type)})` : ''}`;
		case 'export':
			return `Origin ${startCase(service_type)} 
			${service_type === 'subsidiary_service' ? `(${startCase(primary_service_type)})` : ''}`;
		default:
			return startCase(service_type);
	}
}
