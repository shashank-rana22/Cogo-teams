import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useGenerateDocument = ({
	shipment_data = {},
	task = '',
	refetch = () => {},
	clearTask = () => {},
}) => {
	const [{ data = {}, loading:documentLoading }, { trigger:listDocumentsTrigger }] = 	useRequest(
		'/list_shipment_documents',
		{ manual: true },
	);

	const [{ loading: pendingTaskLoading }, { trigger :pendingTaskTrigger }] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const documentList = data?.list || [];
	const generateCertificate = async () => {
		const params = {
			shipment_id: shipment_data?.id,
		};
		try {
			await listDocumentsTrigger({
				params,
			});
		} catch (err) {
			Toast.error(err?.error?.message || err?.data?.error);
		}
	};

	const completeTask = async () => {
		try {
			const res = await pendingTaskTrigger({
				data: {
					id: task.id,
				},
			});
			if (!res?.hasError) {
				Toast.success('Task Completed Successfully');
				clearTask();
				refetch();
			} else {
				Toast.error('Something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		documentList,
		pendingTaskLoading,
		documentLoading,
		completeTask,
		generateCertificate,
	};
};
export default useGenerateDocument;
