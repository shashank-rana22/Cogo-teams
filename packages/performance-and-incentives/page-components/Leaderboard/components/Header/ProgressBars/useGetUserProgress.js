import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useGetUserProgress() {
	const { user, partner } = useSelector(({ profile }) => profile);

	const [{ data : { kam_progress = {}, manager_progress = {} } = {} }] = useAllocationRequest({
		url     : 'user_progress',
		method  : 'GET',
		authkey : 'get_agent_scoring_user_progress',
		params  : {
			user_id    : user?.id,
			partner_id : partner?.id,
		},
	}, { manual: false });

	return {
		kam_progress,
		manager_progress,
	};
}

export default useGetUserProgress;
