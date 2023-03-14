import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components';
import { useRequest } from '@cogo/commons/hooks';

const updateShipmentDocument = ({
	task,
	doc_data,
	remarkValue = '',
	onClose,
	refetch,
}) => {
	const scope = useSelector(({ general }) => general?.scope);

	const updateDocAPI = useRequest(
		'post',
		false,
		scope,
	)('update_shipment_document');

	const updateDocument = async (state) => {
		try {
			const payload = {
				id: doc_data.id,
				state,
				pending_task_id: task.id,
				document_type: doc_data.document_type,
				performed_by_org_id: task.organization_id,
				remarks:
					state === 'document_amendment_requested' ? [remarkValue] : undefined,
			};

			const response = await updateDocAPI.trigger({ data: payload });

			if (!response?.hasError) {
				onClose();
				refetch();
			} else {
				toast.error('Something went wrong');
			}
		} catch {
			toast.error('There was an issue updating the document');
		}
	};
	return { updateDocument, loading: updateDocAPI.loading };
};

export default updateShipmentDocument;
