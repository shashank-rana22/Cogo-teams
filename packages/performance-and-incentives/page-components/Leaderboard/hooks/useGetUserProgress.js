import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

function useGetUserProgress() {
	const { user, partner } = useSelector(({ profile }) => profile);

	const [{ data : { kam_progress = {}, manager_progress = {} } = {} }, trigger] = useAllocationRequest({
		url     : 'user_progress',
		method  : 'GET',
		authkey : 'get_agent_scoring_user_progress',
		params  : {
			user_id    : user?.id,
			partner_id : partner?.id,
		},
	}, { manual: true });

	const getUserProgress = useCallback(async () => {
		try {
			await trigger({ data: { user_id: user?.id, partner_id: partner?.id } });
		} catch (err) {
			console.error(err, 'err');
		}
	}, [partner?.id, trigger, user?.id]);

	useEffect(() => {
		getUserProgress();
	}, [getUserProgress]);

	return {
		kam_progress,
		manager_progress,
		getUserProgress,
	};
}

export default useGetUserProgress;
