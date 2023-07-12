import commonTabs from './COMMON_TABS';

const airFreightTabs = {
	air_freight: {
		tabs: [
			{ label: 'Ongoing', value: 'ongoing' },
			{ label: 'Pending Invoices', value: 'triggered_pending_invoices' },
			{ label: 'Completed', value: 'completed' },
			{ label: 'Cancelled', value: 'cancelled' },
		],
		possible_filters: ['importer_exporter_id', 'source', 'tags'],
	},
	air_customs: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
	air_freight_local: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
	domestic_air_freight: {
		tabs             : commonTabs,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
};

export default airFreightTabs;
