import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useListCogoEntities = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });

	const getCogoList = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit : 100,
					page       : 1,
				},
			});
		} catch (e) {
			console.error(e, 'e');
		}
	}, [trigger]);

	useEffect(() => {
		getCogoList();
	}, [getCogoList]);

	return {
		entityLoading : loading,
		entityData    : data?.list || [],
	};
};

export default useListCogoEntities;
