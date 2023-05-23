import GLOBAL_CONSTANTS from '../constants/globals';

const getEntityCode = (entityId = '') => {
	const entity = Object.values(GLOBAL_CONSTANTS.cogoport_entities).find(
		(value) => value.id === entityId,
	);

	return entity ? Object.keys(GLOBAL_CONSTANTS.cogoport_entities)
		.find((key) => GLOBAL_CONSTANTS.cogoport_entities[key] === entity) : '';
};

export default getEntityCode;
