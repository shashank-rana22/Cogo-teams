import { startCase } from '@cogoport/utils';

const getContainerType = ({ container_type }) => {
	if (container_type === 'standard') {
		return 'Std.';
	}

	return startCase(container_type);
};

const getDetails = ({ item, service_type, primary_service = '' }) => {
	const {
		containers_count,
		container_size,
		packages_count,
		commodity,
		volume,
		weight,
		cargo_weight_per_container,
		trucks_count,
		truck_type,
		container_type,
		cargo_value_currency = '',
		cargo_value = 0,
		code = '',
	} = item || {};

	const MAPPING = {
		fcl_freight: [
			`${containers_count} x ${container_size} FT`,
			`${getContainerType({ container_type })} ${startCase(commodity)}`,
		],
		lcl_freight: [
			`${packages_count} packages`,
			`${commodity}`,
		],
		air_freight: [
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
		],
		trailer_freight: [
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container}MT`,
		],
		rail_domestic_freight: [
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container}MT`,
		],
		ftl_freight: [
			`${trucks_count} X ${startCase(truck_type)}`,
			`${commodity || 'General'}`,
		],
		ltl_freight : [`${volume} cc`, `${weight} kg`, `${commodity || 'General'}`],
		fcl_customs : [
			`${containers_count} container`,
			`${container_size} FT`,
			`${container_type}`,
		],
		lcl_customs: [
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		air_customs: [
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		fcl_freight_local: [
			`${containers_count} container`,
			`${container_size} FT`,
			`${cargo_weight_per_container} MT`,
		],
		air_freight_local: [
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		cargo_insurance: [
			`${commodity}`, `Cargo Value: ${cargo_value_currency} ${cargo_value}`,
		],
		subsidiary: [`code: ${code}`],
	};

	return MAPPING[service_type || primary_service] || [];
};

export default getDetails;
