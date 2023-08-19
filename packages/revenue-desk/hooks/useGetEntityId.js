import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetEntityId = () => {
	const [{ data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_cogo_entities',
	}, { manual: true });

	const getEntityId = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit: 100,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [trigger]);

	useEffect(() => { getEntityId(); }, [getEntityId]);

	return { data };
};

export default useGetEntityId;
