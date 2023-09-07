import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export function globalEntityFilter({ entity }) {
	const entityDetails = GLOBAL_CONSTANTS.cogoport_entities[entity] || {};
	const { id: entityId } = entityDetails;
	return entityId;
}
