import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getServicesUnitMapping = () => {
	let servicesMapping = {};

	Object.keys(GLOBAL_CONSTANTS.services).forEach((eachService) => {
		servicesMapping = {
			...servicesMapping,
			[`${eachService}_service`]: GLOBAL_CONSTANTS.services[eachService]?.unit?.short_name,
		};
	});

	return servicesMapping;
};
export default getServicesUnitMapping;
