import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getApiErrorString from '../utils/getApiErrorString';

function useGetTaskConfig({ task = {}, onCancel = () => {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'get_task_config',
		method : 'GET',
	}, { manual: true });

	const getTaskConfigTrigger = useCallback(() => {
		(async () => {
			try {
				const res = await trigger({
					params: { pending_task_id: task.id },
				});
				if (res.hasError) {
					onCancel();
				}
			} catch (err) {
				Toast.error(getApiErrorString(err));
			}
		})();
	}, [trigger, task.id, onCancel]);

	useEffect(() => {
		getTaskConfigTrigger();
	}, [getTaskConfigTrigger]);

	console.log('sfwefrwerwdaswfwef', data);
	return {
		loading,
		taskConfigData: data,
	};
}

export default useGetTaskConfig;
