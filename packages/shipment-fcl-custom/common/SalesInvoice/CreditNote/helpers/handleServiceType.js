import { startCase } from '@cogoport/utils';

export const handleServiceType = (service) => {
	const serviceType = service?.display_name || service?.service_type;

	return service?.trade_type === 'export'
		? `Origin ${startCase(serviceType)}`
		: `Destination ${startCase(serviceType)}`;
};
