import { useSelector } from '@cogo/store';
import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components';

const useGenerateDocument = ({ shipment_data, task, refetch, clearTask }) => {
	const scope = useSelector(({ general }) => general.scope);
	const [generateData, setGenerateData] = useState();

	const {
		trigger: GenerateTrigger,
		data: certificateData,
		loading: generateLoading,
	} = useRequest('post', false, scope)('/generate_mawb_freight_certificate');

	const {
		trigger: listDocumentsTrigger,
		data,
		loading: documentLoading,
	} = useRequest('get', false, scope)('/list_shipment_documents');

	const { trigger: pendingTaskTrigger, loading: pendingTaskLoading } =
		useRequest('post', false, scope)('/update_shipment_pending_task');

	const documentList = data?.list || [];
	const generateCertificate = async () => {
		const params = {
			shipment_id: shipment_data?.id,
		};
		let payload = {};
		payload = {
			shipment_id: shipment_data?.id,
		};
		try {
			const res = await GenerateTrigger({
				data: payload,
			});

			setGenerateData(res);
			if (!res?.hasError) {
				await listDocumentsTrigger({
					params,
				});
			}
		} catch (err) {
			toast.error(err?.error?.message);
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
				toast.success('Task Completed Successfully');
				clearTask();
				refetch();
			} else {
				toast.error('Something went wrong');
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		documentList,
		pendingTaskLoading,
		documentLoading,
		generateLoading,
		certificateData,
		completeTask,
		generateCertificate,
		generateData,
	};
};
export default useGenerateDocument;
