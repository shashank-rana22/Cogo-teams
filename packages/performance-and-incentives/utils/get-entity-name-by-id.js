import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getEntityNameById = (entity_id) => {
	let cogoEntity = '';
	Object.values(GLOBAL_CONSTANTS.cogoport_entities).forEach((entity) => {
		const { id, name } = entity;

		if (id === entity_id) {
			cogoEntity = name;
		}
	});

	return cogoEntity;
};

export default getEntityNameById;
