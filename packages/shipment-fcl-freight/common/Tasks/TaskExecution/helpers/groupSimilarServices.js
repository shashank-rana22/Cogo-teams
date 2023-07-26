import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const groupedSimilarServicesData = (servicesList, service_type, service_id) => {
	const SERVICE_IDS = [];
	let title = {};

	const task_service = (servicesList || [])
		.find((service) => service?.id === service_id);
	const { trade_type } = task_service;

	(servicesList || []).forEach((service) => {
		if (service?.trade_type === trade_type && service?.service_type === service_type) {
			SERVICE_IDS.push(service?.id);
			const commodity = service?.commodity ? service?.commodity : 'GENERAL';

			title = {
				...title,
				[service?.id]: (
					<div style={{ padding: '4px 8px' }}>
						{service?.containers_count}
						<Pill>
							{startCase(service?.container_size)}
						</Pill>
						<Pill>{startCase(service?.container_type)}</Pill>
						<Pill>{startCase(commodity)}</Pill>
					</div>
				),
			};
		}
	});

	return { similarServiceIds: SERVICE_IDS, title };
};
export default groupedSimilarServicesData;
