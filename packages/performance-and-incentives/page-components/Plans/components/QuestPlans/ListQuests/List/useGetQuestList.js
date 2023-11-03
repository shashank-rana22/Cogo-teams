import { useAllocationRequest } from '@cogoport/request';

const useGetQuestList = () => {
	const [{ loading, data }] = useAllocationRequest(
		{
			url     : '/quests',
			method  : 'GET',
			authkey : 'get_agent_scoring_quests',
		},
		{ manual: false },
	);

	return {
		loading,
		data,
	};
};

export default useGetQuestList;
