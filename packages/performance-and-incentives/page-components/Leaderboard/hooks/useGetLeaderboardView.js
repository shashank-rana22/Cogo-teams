import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useEffect } from 'react';

function useGetLeaderboardView() {
	const dispatch = useDispatch();

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/view',
		method  : 'GET',
		authkey : 'get_agent_scoring_view',
	}, { manual: true });

	const getLeaderboardView = async () => {
		try {
			const res = await trigger();

			dispatch(setProfileState({ incentive_leaderboard_viewtype: res?.data }));
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something Went Wrong!');
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { getLeaderboardView(); }, []);

	return {
		loading,
		viewData: data,
	};
}

export default useGetLeaderboardView;
