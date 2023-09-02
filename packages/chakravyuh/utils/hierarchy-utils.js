export const HIERARCHY_MAPPING = { port_id: 0, region_id: 1, country_id: 2, continent_id: 3 };
const hierarcyArray = Object.keys(HIERARCHY_MAPPING);
const INCREMENT = 1;

export const getLowestHierarchy = (hierarchy = {}) => Object.keys(hierarchy).filter((key) => !!hierarchy[key])
	.reduce((a, key) => (HIERARCHY_MAPPING[a] > HIERARCHY_MAPPING[key] ? key : a), 'continent_id');

export const getHighestHierarchy = (hierarchy = {}) => Object.keys(hierarchy).filter((key) => !!hierarchy[key])
	.reduce((a, key) => (HIERARCHY_MAPPING[a] < HIERARCHY_MAPPING[key] ? key : a), 'port_id');

export const getParentHierarchy = (child = 'port_id') => hierarcyArray?.[HIERARCHY_MAPPING[child] + INCREMENT];

export const getChildHierarchy = (parent = 'country_id') => hierarcyArray?.[HIERARCHY_MAPPING[parent] - INCREMENT];

export const getHigherHierarchy = (child = 'port_id') => hierarcyArray
	.filter((key, idx) => idx > HIERARCHY_MAPPING[child]);

export const getLowerHierarchy = (child = 'port_id') => hierarcyArray
	.filter((key, idx) => idx < HIERARCHY_MAPPING[child]);
