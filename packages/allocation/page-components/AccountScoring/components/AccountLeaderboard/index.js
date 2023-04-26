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
	const { control, formState: { errors }, watch } = useForm();

	const {
		graphData = [], graphLoading = false,
		setGraphParams = () => {},
	} = useGetAccountDistributionGraph();

	const {
		leaderboardLoading = false, leaderboardList = [],
		setLeaderboardParams = () => {},
	} = useGetEngagementScoringLeaderboard();

	const { organization, kam, date, segment } = watch();

	// Todo :  kam, segment filters need to be added as soon as the filter key is provided by the backend

	useEffect(() => {
		setGraphParams((pv) => ({
			...pv,
			filters: {
				created_at : date || undefined,
				service_id : organization || undefined,
			},
		}));

		setLeaderboardParams((pv) => ({
			...pv,
			filters: {
				created_at : date || undefined,
				service_id : organization || undefined,
			},
		}));
	}, [organization, kam, date, segment, setGraphParams, setLeaderboardParams]);

	return (
		<section className={styles.container}>
			<div className={styles.header_text}>Account Score Distribution</div>
			<HeaderFilters
				control={control}
				errors={errors}
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
