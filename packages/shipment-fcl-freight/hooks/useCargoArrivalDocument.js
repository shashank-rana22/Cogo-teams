import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCargoArrivalDocument = ({
	pendingTask,
	refetch,
	setShowDocument,
	clearTask,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	});

	const submitDocument = async (values) => {
		if (values) {
			const body = {
				shipment_id        : pendingTask?.shipment_id,
				uploaded_by_org_id : pendingTask?.organization_id,
				document_type      : 'container_arrival_notice',
				service_id         : pendingTask?.service_id,
				service_type       : pendingTask?.service_type,
				pending_task_id    : pendingTask?.id,
				documents          : [
					{
						file_name    : values?.cargo_arrival_notice?.fileName,
						document_url : values?.cargo_arrival_notice?.finalUrl,
						data         : {
							description: values?.document_description,
						},
					},
				],
			};
			try {
				const res = await trigger({ data: body });
				if (!res?.hasError) {
					setShowDocument(false);
					refetch();
					clearTask();
				}
				if (res?.hasError) {
					toastApiError(res);
				}
			} catch (err) {
				toastApiError(err);
			}
		}
	};

	return {
		submitDocument,
		loading,
	};
};

export default useCargoArrivalDocument;
