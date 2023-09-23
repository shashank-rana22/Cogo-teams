import { useAllocationRequest } from '@cogoport/request';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useEffect, useState } from 'react';

import { getTodayStartDate } from '../../utils/start-date-functions';

function useGetLeaderboardView() {
	const { partner } = useSelector(({ profile }) => profile);

	const dispatch = useDispatch();

	const [entity, setEntity] = useState(partner.id);
	const [dateRange, setDateRange] = useState({
		startDate : getTodayStartDate(),
		endDate   : new Date(),
	});

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
			console.log(err);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { getLeaderboardView(); }, []);

	return {
		loading,
		viewData: data,
		entity,
		setEntity,
		dateRange,
		setDateRange,
	};
}

export default useGetLeaderboardView;
