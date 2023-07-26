import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getServiceDetails = (str = '') => {
	const SERVICE_OBJ = {};

	if (str.includes('short')) {
		SERVICE_OBJ.service_type = str[GLOBAL_CONSTANTS.zeroth_index] === 'f' ? 'fcl_freight' : 'lcl_freight';
		SERVICE_OBJ.service_duration_type = 'short_transit';
	} else if (str.includes('long')) {
		SERVICE_OBJ.service_type = str[GLOBAL_CONSTANTS.zeroth_index] === 'f' ? 'fcl_freight' : 'lcl_freight';
		SERVICE_OBJ.service_duration_type = 'long_transit';
	} else {
		SERVICE_OBJ.service_type = str;
	}

	return SERVICE_OBJ;
};

const getPayload = ({ values = {}, agentExperienceSlabs = [], configId = '', isEditMode = false }) => {
	const shipmentCapacities = Object.keys(values).map((item) => {
		let str = item;
		const lastCharacter = str.slice(-1);
		str = str.slice(0, -1);

		const slabDetails = agentExperienceSlabs[Number(lastCharacter)];

		const serviceObj = getServiceDetails(str) || {};

		const slabLowerLimit = Number(lastCharacter === '3' ? slabDetails.slab_lower_limit.slice(0, -1)
			: slabDetails.slab_lower_limit);

		return {
			slab_lower_limit     : slabLowerLimit,
			slab_upper_limit     : slabDetails.slab_upper_limit ? Number(slabDetails.slab_upper_limit) : 99999,
			service_type         : serviceObj.service_type,
			service_transit_type : serviceObj.service_duration_type,
			shipment_capacity    : Number(values[item]),
		};
	});

	const payload = {
		shipments_capacity_details: shipmentCapacities,
		...(isEditMode ? { id: configId } : { config_id: configId }),
	};

	return payload;
};

export default getPayload;
