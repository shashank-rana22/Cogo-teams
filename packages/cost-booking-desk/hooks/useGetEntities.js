import { useRequest } from '@cogoport/request';

const useGetEntities = () => {
	const [{ data: listEntities, loading: entitiesLoading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
		params : {
			filters: {
				status: 'active',
			},
			page_limit : 10,
			page       : 1,
		},
	}, { manual: false });

	return {
		listEntities,
		entitiesLoading,
	};
};

export default useGetEntities;
