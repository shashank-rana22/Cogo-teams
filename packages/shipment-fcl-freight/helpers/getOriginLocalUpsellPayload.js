const getOriginLocalUpsellPayload = ({ userData, primary_service, shipment_data }) => {
	const trade_type = primary_service?.trade_type === 'export' ? 'import ' : 'export';
	const port_id = primary_service?.trade_type === 'export'
		? primary_service?.destination_port?.id : primary_service?.origin_port?.id;
	const { cargo_details = [] } = primary_service;
	return {
		importer_exporter_id                  : userData?.organization_id,
		importer_exporter_branch_id           : userData?.organization_branch_id,
		user_id                               : userData?.user_id,
		search_type                           : 'fcl_freight_local',
		source_id                             : shipment_data?.id,
		source                                : 'cross_country_upsell',
		fcl_freight_local_services_attributes : cargo_details.map((cargo) => ({
			trade_type,
			port_id,
			...(cargo || {}),
			bls_count        : primary_service?.bls_count,
			status           : 'active',
			shipping_line_id : primary_service?.shipping_line_id,
		})),

	};
};

export default getOriginLocalUpsellPayload;
