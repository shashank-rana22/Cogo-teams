import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

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
					params: { pending_task_id: task.id },
				});
				setApiData(res?.data);
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger, task.id]);

	useEffect(() => {
		getTaskConfigTrigger();
	}, [getTaskConfigTrigger]);

	return {
		loading,
		taskConfigData: apiData,
	};
}

export default useGetTaskConfig;
