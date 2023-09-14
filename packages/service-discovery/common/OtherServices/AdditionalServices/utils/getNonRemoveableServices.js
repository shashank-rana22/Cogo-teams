const SERVICES_MAPPING_WITH_TRADE_TYPE = {
	export: {
		fcl_freight: 'export_fcl_freight_local',
	},
	import: {
		fcl_freight: 'import_fcl_freight_local',
	},
};

const getSeviceWiseAddionalNonRemovableServices = ({ trade_type = '', source = '', main_service = '' }) => {
	const SERVICES_ARRAY = [];

	if (main_service === 'fcl_freight') {
		if (source === 'checkout') {
			SERVICES_ARRAY.push(...['export_fcl_freight_local', 'import_fcl_freight_local']);
		} else {
			SERVICES_ARRAY.push(SERVICES_MAPPING_WITH_TRADE_TYPE[trade_type]?.[main_service]);
		}
	}

	return SERVICES_ARRAY;
};

const getNonRemoveableServices = ({ trade_type = '', source = '', main_service = 'fcl_freight' }) => {
	const additionalNonRemovableServices = getSeviceWiseAddionalNonRemovableServices({
		trade_type,
		main_service,
		source,
	});

	return [
		main_service,
		...(additionalNonRemovableServices || []),
	];
};
export default getNonRemoveableServices;
