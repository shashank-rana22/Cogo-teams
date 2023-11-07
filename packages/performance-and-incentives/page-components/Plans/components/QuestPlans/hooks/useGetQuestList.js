import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetQuestList = ({ manual = true }) => {
	const [params, setParams] = useState({
		page                      : 1,
		page_limit                : 10,
		cogo_entity_data_required : true,
		role_data_required        : true,
		sort_by                   : 'created_at',
		sort_type                 : 'desc',
		filters                   : {
			status: 'active',
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/quests',
			method  : 'GET',
			authkey : 'get_agent_scoring_quests',
			params,
		},
		{ manual },
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
		params,
		setParams,
		getNextPage,
		refetch,
	};
};

export default useGetQuestList;
