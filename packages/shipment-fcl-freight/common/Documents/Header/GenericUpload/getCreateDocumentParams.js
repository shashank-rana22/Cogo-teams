const getCreateDocumentParams = ({ shipmentData, formValues, activeStakeholder, selectSource, orgId }) => {
	let params = {};

	const org_id = orgId || shipmentData?.importer_exporter_id;

	switch (activeStakeholder) {
		case 'superadmin':
		case 'admin':
			params = {
				shipment_id         : shipmentData?.id,
				document_type       : formValues?.document_type,
				uploaded_by_user_id : shipmentData?.agent_id || shipmentData?.booking_agent_id || undefined,
				uploaded_by_org_id  : org_id,
				service_type        : 'fcl_freight_service',
			};
			break;

		case 'booking_agent':
		case 'consignee_shipper_booking_agent':
			params = {
				shipment_id         : shipmentData?.id,
				document_type       : formValues?.document_type,
				uploaded_by_user_id : shipmentData?.agent_id || shipmentData?.booking_agent_id || undefined,
				uploaded_by_org_id  : shipmentData?.importer_exporter_id || undefined,
				service_type        : 'fcl_freight_service',
			};
			break;

		case 'booking_desk':
		case 'booking_desk_manager':
		case 'document_desk':
		case 'document_desk_manager':
			params = {
				shipment_id         : shipmentData?.id,
				document_type       : formValues?.document_type,
				uploaded_by_user_id : shipmentData?.agent_id || shipmentData?.booking_agent_id || undefined,
				uploaded_by_org_id  : selectSource || undefined,
				service_type        : 'fcl_freight_service',
			};
			break;
		default:
			params = {};
			break;
	}
	return params;
};
export default getCreateDocumentParams;
