const STAKE_HOLDER_SPECIFIC_PROPS = {
	okam_create: {
		state        : 'requested_for_importer_exporter',
		api          : '/create_shipment_additional_service',
		buy_disabled : false,
	},
	okam_update: {
		state        : 'requested_for_importer_exporter',
		api          : '/update_shipment_additional_service',
		buy_disabled : true,
	},
	so_create: {
		state        : 'quoted_by_service_provider',
		api          : '/create_shipment_additional_service',
		buy_disabled : false,
	},
	so_update: {
		state        : 'quoted_by_service_provider',
		api          : '/update_shipment_additional_service',
		buy_disabled : false,
	},
};

export default STAKE_HOLDER_SPECIFIC_PROPS;
