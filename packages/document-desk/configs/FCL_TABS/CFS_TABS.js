const TABWISE_FILTERS = ({ activeTab }) => {
	const mapping = {
		in_progress: {
			state: [
				'in_progress',
				'shipment_received',
				'confirmed_by_importer_exporter',
			],
		},
		completed: {
			state: 'completed',
		},
		cancelled: {
			state: 'cancelled',
		},
	};

	return mapping[activeTab] || {};
};

const CRITICAL_TABS = {};

const cfsMapping = {
	TABWISE_FILTERS,
	CRITICAL_TABS,
};

export default cfsMapping;
