import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const getParams = ({ taskId = '', restFilters = {} }) => ({
	filters: {
		service_objects : [{ id: taskId }],
		type            : 'email',
		...(restFilters || {}),
	},
	communication_content_required: true,
});

const useListCommunication = ({ taskId }) => {
	const scope = useSelector(({ general }) => general.scope);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_communications',
		method : 'GET',
		scope,
	}, { manual: false });

	const getList = useCallback(async (restFilters) => {
		const res = await trigger({
			params  : getParams({ taskId, restFilters }),
			headers : {
				stopApiCache: true,
			},
		});
		return res;
	}, [taskId, trigger]);

	useEffect(() => {
		if (taskId) {
			getList();
		}
	}, [getList, taskId]);

	return {
		list: data?.list,
		loading,
	};
};

export default useListCommunication;
