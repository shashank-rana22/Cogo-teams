import { useRequest } from '@cogoport/request';

const useGetEntities = () => {
	const [{ data: listEntities, loading:entitiesLoading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });

	return {
		listEntities,
		entitiesLoading,
	};
};

export default useGetEntities;
