import GLOBAL_CONSTANTS from '../constants/globals';

export const getDefaultEntityCode = (entityId = '') => {
	let entityCode = '';

	Object.values(GLOBAL_CONSTANTS.cogoport_entities).forEach((value) => {
		if (value.id === entityId) {
			entityCode = value.default_entity_code;
		}
	});

	return entityCode;
};

const getEntityCode = (entityId = '') => {
	let entityCode = '';

	Object.entries(GLOBAL_CONSTANTS.cogoport_entities).forEach(([key, value]) => {
		if (value.id === entityId) {
			entityCode = key;
		}
	});

	return entityCode;
};

export default getEntityCode;
