import { useRequest } from '@cogoport/request';

const useListCogoEntity = () => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });

	const listCogoEntities = async () => {
		try {
			await trigger({
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
	};

	return {
		loading,
		entity_data: data?.list || [],
		listCogoEntities,
	};
};

export default useListCogoEntity;
