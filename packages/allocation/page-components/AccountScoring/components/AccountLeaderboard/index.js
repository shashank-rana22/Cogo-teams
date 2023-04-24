import { useForm } from '@cogoport/forms';

import leaderboardColumns from '../../constants/get-leaderboard-columns';
import useGetAccountDistributionGraph from '../../hooks/useGetAccountDistributionGraph';
import useGetEngagementScoringLeaderboard from '../../hooks/useGetEngagementScoringLeaderboard';

import HeaderFilters from './HeaderFilters/index';
import Leaderboard from './Leaderboard/index';
import ScoreDistributionGraph from './ScoreDistributionGraph/index';
import styles from './styles.module.css';

function AccountLeaderboard() {
	const formProps = useForm();

	const {
		control, formState: { errors },
	} = formProps;

	const { graphData = [], graphLoading = false } = useGetAccountDistributionGraph();

	const { leaderboardLoading = false, leaderboardList = [] } = useGetEngagementScoringLeaderboard();

	return (
		<section className={styles.container} id="core_engine_container">
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
