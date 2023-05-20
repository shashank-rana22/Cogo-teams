import { startCase } from '@cogoport/utils';

export const handleServiceType = (charge) => {
	const serviceType = charge?.display_name || charge?.service_type;

	return charge?.trade_type === 'export'
		? `Origin ${startCase(serviceType)}`
		: `Destination ${startCase(serviceType)}`;
};
