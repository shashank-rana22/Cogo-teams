import { useEffect } from 'react';
import { useSelector } from '@cogo/store';
import { useRequest } from '@cogo/commons/hooks';

const useListCommunication = ({ taskId }) => {
	const scope = useSelector(({ general }) => general.scope);

	const { data, loading, trigger } = useRequest(
		'get',
		false,
		scope,
	)('/list_communications');

	const getList = (restFilters) => {
		return trigger({
			params: {
				filters: {
					service_objects: [{ id: taskId }],
					type: 'email',
					...(restFilters || {}),
				},
			},
		});
	};

	useEffect(() => {
		(async () => {
			if (taskId) {
				await getList();
			}
		})();
	}, [taskId]);

	return {
		list: data?.list,
		loading,
	};
};

export default useListCommunication;
