import { isEmpty, startCase, upperCase } from '@cogoport/utils';

export default function getServiceNameforTableColumn(service_type, trade_type = '', truck_number = '') {
	if (!isEmpty(truck_number)) {
		return `Truck Number : ${upperCase(truck_number)}`;
	}
	switch (trade_type) {
		case 'import':
			return `Destination ${startCase(service_type)}`;
		case 'export':
			return `Origin ${startCase(service_type)}`;
		default:
			return startCase(service_type);
	}
}
