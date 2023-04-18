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
						file_name    : values?.url?.name,
						document_url : values?.url?.url,
						data         : {
							description: values?.description,
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
					console.log(res?.message);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	return {
		submitDocument,
		loading,
	};
};

export default useCargoArrivalDocument;
