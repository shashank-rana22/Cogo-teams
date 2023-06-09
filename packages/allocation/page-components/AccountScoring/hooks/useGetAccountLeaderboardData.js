import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useGetAccountDistributionGraph from './useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from './useGetEngagementScoringLeaderboard';

const useGetAccountLeaderboardData = () => {
	const {
		graphData,
		graphLoading,
		setGraphParams,
	} = useGetAccountDistributionGraph();

	const {
		leaderboardLoading,
		leaderboardList,
		setLeaderboardParams,
		paginationData,
		getNextPage,
	} = useGetEngagementScoringLeaderboard();

	const { control, watch, resetField } = useForm({
		defaultValues: {
			date: new Date(),
		},
	});

	const { organization, user_id, date, service, warmth, segment } = watch();

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			created_at : date || undefined,
			service    : service || undefined,
			filters    : {
				service_id : organization || undefined,
				user_id    : user_id || undefined,
				warmth     : warmth || undefined,
				segment    : segment || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			created_at : date || undefined,
			service    : service || undefined,
			filters    : {
				service_id : organization || undefined,
				user_id    : user_id || undefined,
				warmth     : warmth || undefined,
				segment    : segment || undefined,
			},
		}));
	}, [organization, user_id, date, service, warmth, segment, setGraphParams, setLeaderboardParams]);

	useEffect(() => {
		resetField('user_id');
	}, [service, resetField]);

	return {
		graphData,
		graphLoading,
		setGraphParams,
		leaderboardLoading,
		leaderboardList,
		setLeaderboardParams,
		paginationData,
		getNextPage,
		control,
		service,
	};
};

export default useGetAccountLeaderboardData;
