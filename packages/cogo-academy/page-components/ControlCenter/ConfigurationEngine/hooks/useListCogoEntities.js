import { useRequest } from '@cogoport/request';
import { useMemo } from 'react';

const useListCogoEntity = () => {
	const params = useMemo(() => ({
		filters: {
			status: 'active',
		},
		page_limit : 100,
		page       : 1,
	}), []);

	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
		params,
	}, { manual: false });

	return {
		loading,
		entity_data: data?.list || [],
	};
};

export default useListCogoEntity;
