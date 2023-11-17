const SERVICE_KEY_DELAYED = ['commodity', 'container_type', 'container_size'];
// const SERVICE_KEY_UPDATED = ['service_type', 'containers_count'];

const getCreateContractPayload = ({ fclServices, formValues, shipment_data }) => {
	const payload = {
		shipment_id        : shipment_data?.id,
		delayed_containers : [],
		// updated_containers : [],
	};

	const { planning = [] } = formValues || {};

	// fclServices?.forEach((service) => {
	// 	const serviceKeys = SERVICE_KEY_UPDATED.reduce((res, key) => ({ ...res, [key]: service?.[key] }), {});
	// 	payload.updated_containers.push({});
	// });

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

	return payload;
};

export default getCreateContractPayload;
