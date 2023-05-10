import GLOBAL_CONSTANTS from '../constants/globals';

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
