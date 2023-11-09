import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
const FTL_TRUCKS_KEYS = ['truck_type', 'trucks_count'];

const getPrefillForm = (values, service_key) => {
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
			...LCL_KEYS.reduce((obj, key) => ({ ...obj, [key]: load[GLOBAL_CONSTANTS.zeroth_index]?.[key] }), {}),
		};
	}

	if (service_type === 'air_freight') {
		loadData = {
			...load[GLOBAL_CONSTANTS.zeroth_index],
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

	if (service_type === 'ftl_freight') {
		const firstLoadObject = load[GLOBAL_CONSTANTS.zeroth_index];

		const { commodity = '', load_selection_type = '' } = firstLoadObject;

		const finalCommoidty = commodity === null ? 'all' : commodity;

		const isTruck = load_selection_type === 'truck';

		loadData = {
			...firstLoadObject,
			commodity: finalCommoidty,
			...(isTruck ? {
				trucks: load.map((truckItem) => (
					FTL_TRUCKS_KEYS.reduce((obj, key) => ({ ...obj, [key]: truckItem[key] }), {})
				)),
			} : {}),
		};
	}

	return loadData;
};
export default getPrefillForm;
