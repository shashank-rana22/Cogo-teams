import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getEntityOptions = () => Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
	(entity) => ({ label: entity.display_name, value: entity.id }),
);

export default getEntityOptions;
