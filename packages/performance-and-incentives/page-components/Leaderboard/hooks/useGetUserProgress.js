import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useMemo } from 'react';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';

const { MANAGER, AGENT } = LEADERBOARD_VIEWTYPE_CONSTANTS;

function useGetUserProgress() {
	const { user, partner, incentive_leaderboard_viewtype } = useSelector(({ profile }) => profile);

	const manualApiTrigger = useMemo(() => ![MANAGER, AGENT]
		.includes(incentive_leaderboard_viewtype), [incentive_leaderboard_viewtype]);

	const params = useMemo(() => ({
		user_id    : user?.id,
		partner_id : partner?.id,
	}), [partner?.id, user?.id]);

	const [{ data : { kam_progress = {}, manager_progress = {} } = {} }, trigger] = useAllocationRequest({
		url     : 'user_progress',
		method  : 'GET',
		authkey : 'get_agent_scoring_user_progress',
		params,
	}, { manual: manualApiTrigger });

	const getUserProgress = useCallback(() => {
		try {
			trigger({ data: params });
		} catch (err) {
			console.error(err, 'err');
		}
	}, [params, trigger]);

	return {
		kam_progress,
		manager_progress,
		getUserProgress,
	};
}

export default useGetUserProgress;
