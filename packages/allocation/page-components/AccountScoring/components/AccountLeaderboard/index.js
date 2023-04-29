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
	const { control, watch, resetField } = useForm({
		defaultValues: {
			date: new Date(),
		},
	});

	const {
		graphData = [], graphLoading = false,
		setGraphParams = () => {},
	} = useGetAccountDistributionGraph();

	const {
		leaderboardLoading = false, leaderboardList = [],
		setLeaderboardParams = () => {}, page = 0, page_limit = 0, total_count = 0, getNextPage,
	} = useGetEngagementScoringLeaderboard();

	const { organization, user_id, date, service } = watch();

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			service : service || undefined,
			filters : {
				created_at : date || undefined,
				service_id : organization || undefined,
				user_id    : user_id || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			service : service || undefined,
			filters : {
				created_at : date || undefined,
				service_id : organization || undefined,
				user_id    : user_id || undefined,

			},
		}));
	}, [organization, user_id, date, service, setGraphParams, setLeaderboardParams]);

	useEffect(() => {
		resetField('user_id');
	}, [service, resetField]);

	return (
		<section className={styles.container}>
			<div className={styles.header_text}>Account Score Distribution</div>

			<HeaderFilters
				control={control}
				service={service}
			/>

			<ScoreDistributionGraph
				graphData={graphData}
				graphLoading={graphLoading}
			/>

			<Leaderboard
				columns={leaderboardColumns}
				leaderboardList={leaderboardList}
				leaderboardLoading={leaderboardLoading}
				page={page}
				page_limit={page_limit}
				total_count={total_count}
				getNextPage={getNextPage}
			/>
		</section>
	);
}

export default AccountLeaderboard;
