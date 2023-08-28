import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListCogoEntities = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_cogo_entities',
		method : 'GET',
	}, { manual: true });

	const listCogoEntities = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit : 20,
					page       : 1,
				},
			});
		} catch (e) {
			console.error(e?.data);
		}
	}, [trigger]);

	useEffect(() => {
		listCogoEntities();
	}, [listCogoEntities]);

	return {
		loading,
		entityList : data?.list || [],
		entityData : data,
		refetch    : listCogoEntities,
	};
};

export default useListCogoEntities;
