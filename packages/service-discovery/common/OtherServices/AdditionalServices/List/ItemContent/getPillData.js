import { COMMODITY_NAME_MAPPING } from '@cogoport/globalization/constants/commodities';
import { startCase } from '@cogoport/utils';

const getPillData = ({ item = {}, service_type = '' }) => {
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

	const commonContainerDetails = [`${['20', '40'].includes(container_size) ? `${container_size}ft.`
		: container_size} ${startCase(container_type)} ${startCase(commodity)}`];

	const commonPackageDetails = [
		`${packages_count} Pkgs, ${volume} CBM Vol., ${weight} KG WT.`,
		COMMODITY_NAME_MAPPING[commodity]?.name || startCase(commodity),
	].filter(Boolean);

	const SUBSIDIARY_CONTENT_MAPPING = {
		fcl_freight       : commonContainerDetails,
		fcl_freight_local : commonContainerDetails,
		fcl_customs       : commonContainerDetails,
		fcl_cfs           : commonContainerDetails,
		air_freight       : commonPackageDetails,
		air_freight_local : commonPackageDetails,
		air_customs       : commonPackageDetails,
	};

	const MAPPING = {
		fcl_freight : commonContainerDetails,
		lcl_freight : [
			`${packages_count} packages`,
			`${commodity}`,
		],
		air_freight     : commonPackageDetails,
		trailer_freight : [
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
			`${startCase(truck_type)}`,
			commodity && (COMMODITY_NAME_MAPPING[commodity]?.name || startCase(commodity)),
		].filter(Boolean),
		ltl_freight: [
			`${volume} CBM Vol., ${weight} KG WT.`,
			commodity && (COMMODITY_NAME_MAPPING[commodity]?.name || startCase(commodity)),
		].filter(Boolean),
		fcl_customs : commonContainerDetails,
		fcl_cfs     : commonContainerDetails,
		lcl_customs : [
			`volume: ${volume} cbm`,
			`weight: ${weight} kgs`,
			`Count: ${packages_count}`,
		],
		air_customs       : commonPackageDetails,
		fcl_freight_local : commonContainerDetails,
		air_freight_local : commonPackageDetails,
		transportation    : [truck_type ? startCase(truck_type) : commonContainerDetails],
		subsidiary        : SUBSIDIARY_CONTENT_MAPPING[item?.service],
		haulage_freight   : commonContainerDetails,
	};

	return MAPPING[service_type] || [];
};

export default getPillData;
