import { useMemo } from 'react';

import Header from './Header';

const formatValue = (all_services) => {
	const result = (all_services || []).reduce((accumulator, service) => {
		if (service?.service_type !== 'subsidiary_service') {
			const truckServices = accumulator[service?.truck_type] || [];
			return {
				...accumulator,
				[service?.truck_type]: [...truckServices, service],
			};
		}
		return accumulator;
	}, {});

	return result;
};

function ServiceDetails({ servicesData = [], activeStakeholder = '' }) {
	const truckCards = formatValue(servicesData);
	const keysLength = (Object.keys(truckCards) || []).length;
	const keysForFields = useMemo(
		() => Array(keysLength).fill(null).map(() => Math.random()),
		[keysLength],
	);

	const addedServiceComponent = (
		Object.keys(truckCards).map((truckCard, index) => (
			<Header
				serviceData={truckCards[truckCard]}
				key={keysForFields[index]}
				activeStakeholder={activeStakeholder}
			/>
		))
	);

	return addedServiceComponent;
}

export default ServiceDetails;
