import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

const TRADE_TYPE = {
	export : 'Origin',
	import : 'Destination',
};

const MAIN_FREIGHT = ['air_freight', 'fcl_freight'];

const getServiceName = (service = {}) => {
	const { trade_type = '', service_type } = service;
	if (MAIN_FREIGHT.includes(service_type)) {
		return service_type;
	}
	return trade_type ? `${TRADE_TYPE[trade_type]}_${service_type}` : service_type;
};

const getDetails = ({ item, primary_service }) => {
	const {
		containers_count = '',
		container_size = '',
		packages_count = '',
		commodity = '',
		volume = '',
		weight = '',
		cargo_weight_per_container = '',
		trucks_count = '',
		truck_type = '',
		container_type = '',
	} = item || {};

	const serviceName = getServiceName(item);

	const MAPPING = {
		fcl_freight: [
			` ${startCase(serviceName)}`,
			container_size ? (
				`${container_size || ''} FT. ${startCase(container_type || '')}. ${
					commodity ? COMMODITY_NAME_MAPPING[commodity || 'general']?.name : ''
				} `
			) : '',
		],
		lcl_freight: [
			` ${startCase(serviceName)}`,
			`${packages_count} packages`,
			`${commodity} `,
		],
		air_freight: [
			` ${startCase(serviceName)}`,
			`volume: ${volume} cbm`,
			`weight: ${weight} kg`,
		],
		trailer_freight: [
			` ${startCase(serviceName)}`,
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container}MT`,
		],
		rail_domestic_freight: [
			` ${startCase(serviceName)}`,
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container}MT`,
		],
		ftl_freight: [
			` ${startCase(serviceName)}`,
			`${trucks_count} truck`,
			`${truck_type}`,
			`${commodity || 'General'}`,
		],
		ltl_freight: [
			` ${startCase(serviceName)}`,
			`${volume} cc`,
			`${weight} kg`,
			`${COMMODITY_NAME_MAPPING[commodity]?.name}`,
		],
		fcl_customs: [
			` ${startCase(serviceName)}`,
			`${containers_count} container`,
			`${container_size} FT`,
			`${container_type}`,
		],
		lcl_customs: [
			` ${startCase(serviceName)}`,
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		air_customs: [
			` ${startCase(serviceName)}`,
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		fcl_freight_local: [
			` ${startCase(serviceName)}`,
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container} MT`,
		],
		air_freight_local: [
			` ${startCase(serviceName)}`,
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
	};

	return MAPPING[primary_service] || MAPPING.fcl_freight;
};

export default getDetails;
