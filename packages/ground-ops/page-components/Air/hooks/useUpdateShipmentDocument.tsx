import { useRequest } from '@cogoport/request';

const useUpdateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'POST',
	});

	const updateDocument = async (values, listAPi) => {
		const serialId = values?.serialId || '';
		const payload = {
			shipment_id         : values?.shipmentId,
			uploaded_by_org_id  : values?.serviceProviderId,
			performed_by_org_id : values?.serviceProviderId,
			document_type       : 'draft_airway_bill',
			id                  : values?.documentId,
			service_id          : values?.serviceId,
			service_type        : 'air_freight_service',
			pending_task_id     : values?.id,
			file_name:
			`Draft_Airway_Bill_For_Shipment_${serialId}_${new Date().getTime()}`
			|| undefined,
		};
		try {
			await trigger({
				data: payload,
			});
			listAPi({});
		} catch (err) {
			console.log(err);
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
