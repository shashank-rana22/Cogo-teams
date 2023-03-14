import { useRequest } from '@cogo/commons/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from '@cogo/store';

const useGetTask = ({ task = {}, onCancel = () => {} }) => {
	const [loading, setLoading] = useState(true);
	const scope = useSelector(({ general }) => general?.scope);
	const getTaskConfigApi = useRequest('get', false, scope)('/get_task_config');

	const getTask = async () => {
		setLoading(true);
		const task_id = task?.id;

		try {
			const res = await getTaskConfigApi.trigger({
				params: { pending_task_id: task_id },
			});

			if (!res.hasError) {
				setLoading(false);
			}
			if (res.hasError) {
				onCancel();
			}
		} catch (err) {
			console.log(err);
			onCancel();
		}
	};

	useEffect(() => {
		if (task?.id) {
			getTask();
		}
	}, [JSON.stringify(task?.id)]);

	return {
		getTaskConfigApi,
		loading,
	};
};

export default useGetTask;
