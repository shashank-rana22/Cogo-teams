const AIR_TABS = [
	{ label: 'Ongoing', value: 'ongoing' },
	{ label: 'Pending Invoices', value: 'triggered_pending_invoices' },
	{ label: 'Completed', value: 'completed' },
	{ label: 'Cancelled', value: 'cancelled' },
];

const airFreightTabs = {
	air_freight: {
		tabs             : AIR_TABS,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
	air_customs: {
		tabs             : AIR_TABS,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
	air_freight_local: {
		tabs             : AIR_TABS,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
	domestic_air_freight: {
		tabs             : AIR_TABS,
		possible_filters : ['importer_exporter_id', 'source', 'tags'],
	},
};

export default airFreightTabs;
