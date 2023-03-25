import { useRequest } from '@cogoport/request';

const useListCogoEntity = () => {
	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
		params : {
			filters: {
				status: 'active',
			},
			page_limit : 100,
			page       : 1,
		},
	}, { manual: false });

	return {
		loading,
		entity_data: data?.list || [],
	};
};

export default useListCogoEntity;
