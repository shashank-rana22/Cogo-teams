import { useAllocationRequest } from '@cogoport/request';

const useGetQuestWinner = ({ questId = null }) => {
	const [{ loading, data }] = useAllocationRequest(
		{
			url     : '/quest_winner',
			method  : 'get',
			authkey : 'get_agent_scoring_quest_winner',
			params  : {
				id: questId || undefined,
			},
		},
		{ manual: false },
	);

	return {
		loading,
		data,
	};
};

export default useGetQuestWinner;
