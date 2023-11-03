import { useAllocationRequest } from '@cogoport/request';

const useGetQuestList = ({ params = {}, setParams = () => {} }) => {
	const DEFAULT_PARAMS = {
		page                      : 1,
		page_limit                : 10,
		cogo_entity_data_required : true,
		role_data_required        : true,
		sort_by                   : 'created_at',
		sort_type                 : 'desc',
	};

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/quests',
			method  : 'GET',
			authkey : 'get_agent_scoring_quests',
			params  : { ...DEFAULT_PARAMS, ...params },
		},
		{ manual: false },
	);

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	const { list = [], ...paginationData } = data || {};

	return {
		loading,
		list,
		paginationData,
		getNextPage,
		refetch,
	};
};

export default useGetQuestList;
