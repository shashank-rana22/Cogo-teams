import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import Activity from '../../../common/Activity';
import IncentiveSnapshot from '../../../common/IncentiveSnapshot';
import RankingAndScoring from '../../../common/RankingAndScoring';
import getRightPanelHeading from '../../../helpers/getRightPanelHeading';

import LoadingState from './LoadingState';
import styles from './styles.module.css';

function RightPanel(props) {
	const {
		data, statsLoading, entity, currLevel, levelStack, incentiveMonth,
		setIncentiveMonth, userIncentiveData, userIncentiveStatsLoading,
	} = props;

	const {
		block_wise_stats: activityData = {},
		graph_data: scoringGraphData = {},
		rank_data: rankData = {},
	} = data || {};

	const { across_user_in_entity: { current_user_rank = 0, total_report_count = 0 } = {} } = rankData || {};

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const HEADING = getRightPanelHeading({ currLevel, entity, viewType, levelStack });

	if (statsLoading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!isEmpty(HEADING) && (
				<div className={styles.inner_container}>

					<div className={styles.entity_tag}>
						<div className={styles.badge} />

						<div>{HEADING}</div>
					</div>

					{ current_user_rank ? (
						<p className={styles.label}>
							Across User In Entity
							{' '}
							:
							{' '}
							<span>
								{current_user_rank}
								{' '}
								/
								{' '}
								{total_report_count}
							</span>
						</p>
					) : null}
				</div>
			)}

			<RankingAndScoring scoringGraphData={scoringGraphData} />

			<IncentiveSnapshot
				currLevel={currLevel}
				incentiveMonth={incentiveMonth}
				setIncentiveMonth={setIncentiveMonth}
				userIncentiveData={userIncentiveData}
				userIncentiveStatsLoading={userIncentiveStatsLoading}
			/>

			<Activity activityData={activityData} />
		</div>
	);
}

export default RightPanel;
