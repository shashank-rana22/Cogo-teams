import { useRequest } from '@cogoport/request';

const useGetEntities = ({ entity_id = '' }) => {
	const [{ data: listEntities, loading: entitiesLoading }] = useRequest({
		method : 'get',
		url    : '/list_cogo_entities',
		params : {
			filters: {
				id     : entity_id,
				status : 'active',
			},
		},
	}, { manual: false });

	return {
		listEntities,
		entitiesLoading,
	};
};

export default useGetEntities;
