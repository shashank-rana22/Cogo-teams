import { isEmpty } from '@cogoport/utils';

const getPayload = ({ values = {}, agentExperienceSlabs = [], configId = '', isEditMode = false, stage }) => {
	const shipmentCapacities = Object.keys(values)?.reduce((acc, curr) => {
		const [index, service_type, service_duration_type] = curr.split('-');

		if (index >= agentExperienceSlabs.length) {
			return acc;
		}

		const slabDetails = agentExperienceSlabs[Number(index)] || {};
		const slabLowerLimit = Number(index === '3' ? slabDetails.slab_lower_limit?.slice(0, -1)
			: slabDetails.slab_lower_limit);

		return [
			...acc,
			{
				slab_lower_limit     : slabLowerLimit,
				slab_upper_limit     : slabDetails.slab_upper_limit ? Number(slabDetails.slab_upper_limit) : 99999,
				service_type,
				service_transit_type : service_duration_type,
				shipment_capacity    : Number(values[curr]),
			},
		];
	}, []);

	const payload = {
		shipments_capacity_details: shipmentCapacities,
		...((isEditMode || !isEmpty(stage)) ? {
			id: configId,
		} : { config_id: configId }),
	};

	return payload;
};

export default getPayload;
