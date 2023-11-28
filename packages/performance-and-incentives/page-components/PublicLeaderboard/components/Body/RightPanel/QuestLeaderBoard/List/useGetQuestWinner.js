import { useAllocationRequest } from '@cogoport/request';

import LEADERBOARD_LOCATIONS from '../../../../../utils/leaderboard-locations';

const useGetQuestWinner = ({ questId = null, officeLocation = null }) => {
	const [{ loading, data }] = useAllocationRequest(
		{
			url     : '/quest_winner',
			method  : 'get',
			authkey : 'get_agent_scoring_quest_winner',
			params  : {
				id      : questId || undefined,
				filters : { office_location_id: LEADERBOARD_LOCATIONS[officeLocation]?.value || undefined },
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
