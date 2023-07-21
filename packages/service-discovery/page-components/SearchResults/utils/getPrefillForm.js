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
	operator_type        : null,
	cargo_readiness_date : addDays(new Date(), 1),
	source               : null,
	payment_term         : null,
	offers               : null,
	shipping_line        : '',
};

const getExtraFiltersObj = (filtersArray) => {
	let resultObj = {};

	(filtersArray || []).forEach((item) => {
		resultObj = {
			...resultObj,
			[item]: EXTRA_FILTERS_DEFAULT_VALUES[item],
		};
	});

	return resultObj;
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
};
export default getPrefillForm;
