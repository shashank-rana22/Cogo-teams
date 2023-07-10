import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';

const getEntityOptions = () => Object.values(ENTITY_MAPPING).map(
	(entity) => ({ label: entity.name, value: entity.id }),
);

export default getEntityOptions;
