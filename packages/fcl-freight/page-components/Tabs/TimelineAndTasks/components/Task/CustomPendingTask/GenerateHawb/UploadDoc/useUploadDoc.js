import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';

const useUploadDocument = ({
	task = {},
	shipment_data = {},
	refetch = () => {},
	clearTask,
}) => {
	const scope = useSelector(({ general }) => general.scope);

	const { trigger: createShipmentDocumentTrigger, loading } = useRequest(
		'post',
		false,
		scope,
	)('/create_shipment_document');

	const uploadDocument = async (values) => {
		const document_number = shipment_data?.booking_reference_number;
		const payload = {
			shipment_id: task?.shipment_id,
			uploaded_by_org_id: task?.organization_id,
			document_type: 'draft_house_airway_bill',
			service_id: task?.service_id,
			service_type: task?.service_type,
			pending_task_id: task?.id,
			documents: [
				{
					file_name: values?.url?.name || undefined,
					document_url: values?.url?.url || undefined,
					data: {
						status: 'uploaded',
						description: values?.description,
						document_number,
						service_id: shipment_data?.service_id,
						service_type: shipment_data?.service_type,
					},
				},
			],
		};

		try {
			if (document_number) {
				const res = await createShipmentDocumentTrigger({
					data: payload,
				});
				if (!res.hasError) {
					toast.success('Task Completed Successfully');
					clearTask();
					refetch();
				}
			}
		} catch (err) {
			console.log(err, 'err');
		}
	};
	return { uploadDocument, loading };
};

export default useUploadDocument;
