import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useMemo } from 'react';

function useGetUserProgress() {
	const { user, partner } = useSelector(({ profile }) => profile);

	const params = useMemo(() => ({
		user_id    : user?.id,
		partner_id : partner?.id,
	}), [partner?.id, user?.id]);

	const [{ data : { kam_progress = {}, manager_progress = {} } = {} }, trigger] = useAllocationRequest({
		url     : 'user_progress',
		method  : 'GET',
		authkey : 'get_agent_scoring_user_progress',
		params,
	}, { manual: false });

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
