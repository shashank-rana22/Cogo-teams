import { addDays } from '@cogoport/utils';

import getLoadArray from './getLoadArray';

const FCL_KEYS = ['containers_count', 'container_size', 'container_type', 'commodity', 'cargo_weight_per_container'];
const LCL_KEYS = ['packages_count', 'weight', 'volume', 'commodity'];
const TRAILER_KEYS = [
	'containers_count',
	'container_size',
	'container_type',
	'commodity',
	'cargo_weight_per_container',
	'trip_type',
];
const HAULAGE_KEYS = [
	'containers_count',
	'container_size',
	'container_type',
	'commodity',
	'cargo_weight_per_container',
];

const EXTRA_FILTERS_DEFAULT_VALUES = {
	operator       : { operator_type: 'all' },
	readiness_date : { cargo_readiness_date: addDays(new Date(), 1) },
	rate_type      : { rate_type: 'all' },
	payment_type   : { payment_terms: 'all' },
	offers         : { offers: 'all' },
};

const getExtraFiltersObj = (filtersArray) => {
	const RESULT_OBJ = {};

	(filtersArray || []).forEach((item) => {
		const filterObj = EXTRA_FILTERS_DEFAULT_VALUES[item] || {};

		Object.keys(filterObj).forEach((key) => {
			RESULT_OBJ[key] = filterObj[key];
		});
	});

	return RESULT_OBJ;
};

const FTL_CARGO_GROSS_KEYS = [
	'packing_type',
	'packages_count',
	'height',
	'length',
	'width',
	'stackability',
];

const LTL_KEYS = [
	'cargo_type',
	'commodity',
	'cargo_readiness_date',
	'weight',
	'volume',
	'height',
	'length',
	'width',
	'package_type',
	'packages_count',
	'stackability',
];

const formattedDangerousCommodityValue = ({
	class_description = '',
	subclass_id = '',
	class_id = '',
	subclass_codes = [],
}) => {
	const category = ['class', class_id, class_description].join('_');

	const categoryValue = [
		'class',
		subclass_id,
		...subclass_codes.map((item) => item),
	].join('_');

	return { category, categoryValue };
};

const formattedTruckCategory = (truck_type) => {
	const truckCategoryArray = truck_type.split('_');
	const truckTypeCategory = [truckCategoryArray[0], truckCategoryArray[1]].join(
		'_',
	);

	return truckTypeCategory;
};

const getPrefillForm = (values, service_key, extraFilters = []) => {
	const { service_details = {} } = values || {};
	const service_type = values[service_key];

	const load = getLoadArray(service_type, service_details);

	let loadData = {};

	if (service_type === 'fcl_freight') {
		loadData = {
			container: load.map((containerItem) => (
				FCL_KEYS.reduce((obj, key) => ({ ...obj, [key]: containerItem[key] }), {})
			)),
		};
	}

	if (service_type === 'lcl_freight') {
		loadData = {
			...LCL_KEYS.reduce((obj, key) => ({ ...obj, [key]: load[0]?.[key] }), {}),
		};
	}

	if (service_type === 'trailer_freight') {
		loadData = {
			container: load.map((containerItem) => (
				TRAILER_KEYS.reduce((obj, key) => ({ ...obj, [key]: containerItem[key] || 'all_commodity' }), {})
			)),
		};
	}

	if (service_type === 'haulage_freight') {
		loadData = {
			container: load.map((containerItem) => (
				HAULAGE_KEYS.reduce((obj, key) => ({ ...obj, [key]: containerItem[key] || 'all_commodity' }), {})
			)),
		};
	}

	return { ...loadData, ...getExtraFiltersObj(extraFilters) };

	// switch (search_type) {
	// 	case 'fcl_freight': {
	// 		setValue(
	// 			'container',
	// 			load.map((containerItem) => (
	// 				FCL_KEYS.reduce((obj, key) => ({ ...obj, [key]: containerItem[key] }), {})
	// 			)),
	// 		);
	// 		break;
	// 	}

	// 	case 'lcl_freight': {
	// 		LCL_KEYS.forEach((key) => {
	// 			setValue(key, load[0]?.[key]);
	// 		});
	// 		break;
	// 	}

	// 	case 'air_freight': {
	// 		const {
	// 			packages = [],
	// 			commodity_details = [],
	// 			weight = '',
	// 			volume = '',
	// 			cargo_clearance_date = '',
	// 			commodity = '',
	// 		} = load[0];

	// 		const {
	// 			packing_type = '',
	// 			packages_count = '',
	// 			handling_type = '',
	// 		} = packages?.[0] || {};

	// 		const {
	// 			commodity_type = '',
	// 			// packing_list = '',
	// 			commodity_class = {},

	// 			commodity_subtype = '',
	// 			temp_controlled_type = '',
	// 			temp_controlled_range = '',
	// 		} = commodity_details?.[0] || {};

	// 		const {
	// 			class_description = '',
	// 			subclass_id = '',
	// 			class_id = '',
	// 			subclass_codes = [],
	// 		} = commodity_class || {};

	// 		setValue('package_type', packing_type);
	// 		setValue('packages_count', packages_count.toString());
	// 		setValue('weight', weight.toString());
	// 		setValue('volume', volume.toString());
	// 		setValue('cargo_clearance_date', new Date(cargo_clearance_date));
	// 		setValue('stackability', handling_type === 'stackable');

	// 		if (commodity === 'general') {
	// 			setValue('commodity', commodity);
	// 			setValue('commodity_subtype', commodity_type);
	// 		} else if (commodity_type === 'temp_controlled') {
	// 			setValue('commodity', commodity_type);
	// 			setValue('commodity_subtype', temp_controlled_type);
	// 			setValue(
	// 				'commodity_subtype_value',
	// 				[temp_controlled_type, temp_controlled_range].join('-'),
	// 			);
	// 		} else if (commodity_type === 'dangerous') {
	// 			setValue('commodity', commodity_type);
	// 			const { category, categoryValue } = formattedDangerousCommodityValue({
	// 				subclass_id,
	// 				class_id,
	// 				class_description,
	// 				subclass_codes,
	// 			});
	// 			setValue('commodity_subtype', category);
	// 			setValue('commodity_subtype_value', categoryValue);
	// 		} else if (commodity_type === 'other_special') {
	// 			setValue('commodity', commodity_type);
	// 			setValue('commodity_subtype', commodity_subtype);
	// 		}

	// 		break;
	// 	}

	// 	case 'ftl_freight': {
	// 		setValue('cargo_type', ftl_commodity_type);
	// 		setValue('commodity', ftl_commodity === null ? 'all' : ftl_commodity);
	// 		setValue('cargo_readiness_date', new Date(ftl_cargo_readiness_date));
	// 		setValue('cargo_readiness_date', new Date(ftl_cargo_readiness_date));
	// 		setValue(
	// 			'ftl_controls_by_type',
	// 			FTL_LOAD_SELECTION_TYPE_MAPING[ftl_load_selection_type],
	// 		);
	// 		if (ftl_load_selection_type === 'truck') {
	// 			setValue(
	// 				'trucks',
	// 				load.map((loadItem) => {
	// 					const { truck_type = '', trucks_count = '' } = loadItem || {};

	// 					const truck_type_category = formattedTruckCategory(truck_type);

	// 					return {
	// 						truck_type_category,
	// 						truck_type,
	// 						trucks_count,
	// 					};
	// 				}),
	// 			);
	// 		} else if (ftl_load_selection_type === 'cargo_gross') {
	// 			const { packages = [], weight = '', volume = '' } = load[0];

	// 			setValue('weight', weight.toString());
	// 			setValue('volume', volume.toString());

	// 			FTL_CARGO_GROSS_KEYS.forEach((key) => {
	// 				if (key === 'stackability') {
	// 					setValue(key, packages?.[0]?.handling_type === 'stackable');
	// 				} else {
	// 					setValue(key, packages?.[0]?.[key]?.toString());
	// 				}
	// 			});
	// 		}
	// 		break;
	// 	}

	// 	case 'ltl_freight': {
	// 		load.forEach((loadItem) => {
	// 			LTL_KEYS.forEach((key) => {
	// 				if (key === 'cargo_type') {
	// 					setValue(
	// 						key,
	// 						loadItem?.commodity === null
	// 							? 'general'
	// 							: 'special_consideration',
	// 					);
	// 				} else if (key === 'commodity') {
	// 					setValue(key, loadItem?.[key] === null ? 'all' : loadItem?.[key]);
	// 				} else if (key === 'stackability') {
	// 					setValue(key, loadItem?.[key] === 'stackable');
	// 				} else if (key === 'cargo_readiness_date') {
	// 					setValue(key, new Date(loadItem?.[key]));
	// 				} else {
	// 					setValue(key, loadItem?.[key]?.toString());
	// 				}
	// 			});
	// 		});
	// 		break;
	// 	}
};
export default getPrefillForm;
