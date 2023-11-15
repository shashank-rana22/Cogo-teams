const getOriginLocalUpsellPayload = ({ userData, primary_service }) => ({
	port_id                     : primary_service?.origin_port?.id,
	trade_type                  : 'export',
	importer_exporter_id        : userData?.organization_id,
	importer_exporter_branch_id : userData?.organization_branch_id,
	user_id                     : userData?.id,
});

export default getOriginLocalUpsellPayload;
