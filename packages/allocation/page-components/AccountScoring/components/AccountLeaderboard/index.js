import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import leaderboardColumns from '../../constants/get-leaderboard-columns';
import useGetAccountDistributionGraph from '../../hooks/useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from '../../hooks/useGetEngagementScoringLeaderboard';

import HeaderFilters from './HeaderFilters/index';
import Leaderboard from './Leaderboard/index';
import ScoreDistributionGraph from './ScoreDistributionGraph/index';
import styles from './styles.module.css';

function AccountLeaderboard() {
	const { control, watch } = useForm({
		defaultValues: {
			date: new Date(Date.now()),
		},
	});

	const {
		graphData = [], graphLoading = false,
		setGraphParams = () => {},
	} = useGetAccountDistributionGraph();

	const {
		leaderboardLoading = false, leaderboardList = [],
		setLeaderboardParams = () => {},
	} = useGetEngagementScoringLeaderboard();

	const { organization, user_id, date } = watch();

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			filters: {
				created_at : date || undefined,
				service_id : organization || undefined,
				user_id    : user_id || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			filters: {
				created_at : date || undefined,
				service_id : organization || undefined,
				user_id    : user_id || undefined,

			},
		}));
	}, [organization, user_id, date, setGraphParams, setLeaderboardParams]);

	return (
		<section className={styles.container}>
			<div className={styles.header_text}>Account Score Distribution</div>

			<HeaderFilters
				control={control}
			/>

			<ScoreDistributionGraph
				graphData={graphData}
				graphLoading={graphLoading}
			/>

			<Leaderboard
				columns={leaderboardColumns}
				leaderboardList={leaderboardList}
				leaderboardLoading={leaderboardLoading}
			/>
		</section>
	);
}

export default AccountLeaderboard;
