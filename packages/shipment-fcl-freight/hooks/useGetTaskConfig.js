import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const EXCLUDE_TASK_TYPES = ['approve_document', 'amend_document'];
const EXCLUDE_TASKS = ['upload_compliance_documents', 'confirm_with_shipper', 'confirm_cargo_readiness'];

function useGetTaskConfig({ task = {} }) {
	const [apiData, setApiData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : 'get_task_config',
		method : 'GET',
	}, { manual: true });

	const getTaskConfigTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: { pending_task_id: task?.id },
				});

				setApiData(res?.data);
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, task.id]);

	useEffect(() => {
		if (EXCLUDE_TASK_TYPES.includes(task?.task_type) || EXCLUDE_TASKS.includes(task?.task)) {
			return;
		}

		getTaskConfigTrigger();
	}, [getTaskConfigTrigger, task]);

	return {
		loading,
		taskConfigData: apiData,
	};
}

export default useGetTaskConfig;
