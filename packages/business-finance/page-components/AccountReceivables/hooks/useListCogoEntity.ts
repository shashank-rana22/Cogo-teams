import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListCogoEntity = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });

	useEffect(() => {
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
			console.log(e, 'e');
		}
	}, [trigger]);

	return {
		loading,
		EntityData: data?.list || [],
	};
};

export default useListCogoEntity;
