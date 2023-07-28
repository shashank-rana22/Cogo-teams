import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getEntityOptions = () => Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
	(entity) => ({ label: entity.name, value: `${entity.id}_${entity.name}` }),
);

export default getEntityOptions;
