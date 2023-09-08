import { startCase } from '@cogoport/utils';

const getDetails = ({ item, primary_service }) => {
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
	} = item || {};

	const MAPPING = {
		fcl_freight: [
			`${container_size} FT. ${startCase(container_type)}. ${startCase(commodity)}`,
		],
		lcl_freight: [
			`${packages_count} packages`,
			`${commodity}`,
		],
		air_freight: [
			`volume: ${volume}`,
			`weight: ${weight}`,
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
			`${trucks_count} truck`,
			`${truck_type}`,
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
		cargo_insurance: [commodity],
	};

	return MAPPING[item.service_type] || MAPPING[primary_service] || MAPPING.fcl_freight;
};

export default getDetails;