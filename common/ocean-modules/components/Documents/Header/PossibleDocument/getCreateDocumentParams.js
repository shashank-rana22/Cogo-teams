const getCreateDocumentParams = ({ shipmentData, formValues, activeStakeholder, filters, orgId }) => {
	let params = {};

	const org_id = orgId || shipmentData?.importer_exporter_id;

	switch (activeStakeholder) {
		case 'Superadmin':
		case 'Admin':
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
				org_account_type    : 'importer_exporter',
				service_type        : 'fcl_freight_service',
			};
			break;

		case 'BookingDesk':
		case 'DocumentDesk':
			params = {
				shipment_id         : shipmentData?.id,
				document_type       : formValues?.document_type,
				uploaded_by_user_id : shipmentData?.agent_id || shipmentData?.booking_agent_id || undefined,
				uploaded_by_org_id  : filters?.uploaded_by_org_id || undefined,
				org_account_type    : 'service_provider',
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
