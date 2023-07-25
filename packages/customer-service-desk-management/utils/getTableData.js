import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import services from '../configurations/service-options';

const DEFAULT_VALUE = 0;

const getTableData = ({ data = {} }) => {
	const serviceWiseData = services?.map((service) => {
		const filteredData = data.shipment_capacities?.filter((item) => ((item.service_transit_type
			? `${item.service_type}_${item.service_transit_type}` : item.service_type) === service.value)) || [];

		return {
			service : service.label,
			data    : filteredData.sort((a, b) => a.slab_lower_limit - b.slab_lower_limit),
		};
	});

	const rowData = serviceWiseData?.map((serviceDetails) => {
		const SERVICE_OBJ = {};
		SERVICE_OBJ.service = serviceDetails.service || '';
		SERVICE_OBJ.trigger = 'Mark as complete';
		serviceDetails.data.forEach((item, slabIndex) => {
			SERVICE_OBJ[`slab_${slabIndex}_capacity`] = item.shipment_capacity || DEFAULT_VALUE;
			SERVICE_OBJ[`slab_${slabIndex}_NEQ`] = item.normalized_capacity || DEFAULT_VALUE;
		});

		return SERVICE_OBJ;
	});

	// const slabData = serviceWiseData?.[GLOBAL_CONSTANTS.zeroth_index]?.data?.map((item) => ({
	// 	slab_lower_limit : item.slab_lower_limit,
	// 	slab_upper_limit : item.slab_upper_limit,
	// 	slab_unit        : item.slab_unit,
	// }));

	const finalData = [
		{
			service         : '',
			slab_0_capacity : 'Capacity',
			slab_1_capacity : 'Capacity',
			slab_2_capacity : 'Capacity',
			slab_3_capacity : 'Capacity',
			slab_0_NEQ      : 'Normalized Eq.(NE)',
			slab_1_NEQ      : 'Normalized Eq.(NE)',
			slab_2_NEQ      : 'Normalized Eq.(NE)',
			slab_3_NEQ      : 'Normalized Eq.(NE)',
			trigger         : '',

		},
		...rowData,
	];

	return { finalData };
};

export default getTableData;
