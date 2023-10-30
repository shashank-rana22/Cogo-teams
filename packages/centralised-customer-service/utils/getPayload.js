import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const OFFSET = -1;
const SLAB_UPPER_LIMIT_MAX = 99999;

const getPayload = ({
	values = {}, agentExperienceSlabs = [],
	id, source = '',
}) => {
	const shipmentCapacities = Object.keys(values)?.reduce((acc, curr) => {
		if (curr.includes('trigger')) return acc;

		const [index, ...rest] = curr.split('-');
		const [service_type, trade_type, service_duration_type] = rest;

		const releaseTrigger = rest.join('-');

		if (index >= agentExperienceSlabs.length) {
			return acc;
		}

		const slabDetails = agentExperienceSlabs[Number(index)] || {};
		const slabLowerLimit = Number((index === '3' && !source)
			? slabDetails.slab_lower_limit?.slice(GLOBAL_CONSTANTS.zeroth_index, OFFSET)
			: slabDetails.slab_lower_limit);

		return [
			...acc,
			{
				slab_unit        : slabDetails.slab_unit,
				slab_lower_limit : slabLowerLimit,
				slab_upper_limit : slabDetails.slab_upper_limit
					? Number(slabDetails.slab_upper_limit) : SLAB_UPPER_LIMIT_MAX,
				service_type,
				service_transit_type : service_duration_type,
				trade_type,
				shipment_capacity    : Number(values[curr]),
				release_triggers     : values[`${releaseTrigger}-release_triggers`]
					.filter((item) => item !== 'trigger'),
			},
		];
	}, []);

	const payload = {
		shipments_capacity_details      : shipmentCapacities,
		ccs_shipment_capacity_detail_id : id,
	};

	return payload;
};

export default getPayload;
