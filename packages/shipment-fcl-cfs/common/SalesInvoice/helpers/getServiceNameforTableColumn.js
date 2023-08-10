import { startCase } from '@cogoport/utils';

export default function getServiceNameforTableColumn(service_type, trade_type = '') {
	switch (trade_type) {
		case 'import':
			return `Destination ${startCase(service_type)}`;
		case 'export':
			return `Origin ${startCase(service_type)}`;
		default:
			return startCase(service_type);
	}
}
