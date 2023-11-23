import { getPlanningContainerServiceWise } from './checkContainerNumbers';

const SERVICE_KEY_DELAYED = ['commodity', 'container_type', 'container_size'];

const getCreateContractPayload = ({ fclServices, formValues, shipment_data, task = {} }) => {
	const payload = {
		shipment_id                : shipment_data?.id,
		delayed_containers         : [],
		updated_containers_details : [],
		trade_partner_id           : task?.task_field_id,
	};

	const { planning = [] } = formValues || {};

	planning.forEach((planService) => {
		const { service_id, containers_count, ...rest } = planService || {};
		const service = fclServices?.find((s) => s?.id === service_id);

		const containersCount = parseInt(containers_count || 0, 10);

		const serviceKeys = SERVICE_KEY_DELAYED.reduce((res, key) => ({ ...res, [key]: service?.[key] }), {});

		const planPayload = {
			...serviceKeys,
			...rest,
			containers_count: containersCount,

		};
		payload.delayed_containers.push(planPayload);
	});

	const planningContainerServiceWise = getPlanningContainerServiceWise({ planning });

	fclServices?.forEach((service) => {
		const updatePayload = {
			service_id       : service?.id,
			containers_count : service?.containers_count,
		};

		if (planningContainerServiceWise?.[service?.id]) {
			updatePayload.containers_count -= planningContainerServiceWise?.[service?.id] || 0;
		}

		payload.updated_containers_details.push(updatePayload);
	});

	return payload;
};

export default getCreateContractPayload;
