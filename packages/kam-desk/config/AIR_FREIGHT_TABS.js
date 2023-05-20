import commonTabs from './COMMON_TABS';

const airFreightTabs = {
	air_freight: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'pending_invoice', 'source', 'tags'],
	},
	domestic_air_freight: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'pending_invoice', 'source', 'tags'],
	},
	air_customs: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'pending_invoice', 'source', 'tags'],
	},
	air_freight_local: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'pending_invoice', 'source', 'tags'],
	},
};

export default airFreightTabs;
