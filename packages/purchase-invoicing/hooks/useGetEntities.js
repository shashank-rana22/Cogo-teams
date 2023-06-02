import { useRequest } from '@cogoport/request';

const useGetEntities = () => {
	const [{ data: listEntities, entitiesloading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
	}, { manual: false });

	return {
		listEntities,
		entitiesloading,
	};
};

export default useGetEntities;
