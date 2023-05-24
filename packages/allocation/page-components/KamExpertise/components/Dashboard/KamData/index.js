import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import useGetKamExpertiseDashboard from '../../../hooks/useGetKamExpertiseDashboard';
import useGetKamExpertiseLevelOverview from '../../../hooks/useGetKamExpertiseLevelOverview';
import useGetKamExpertiseStatsList from '../../../hooks/useGetKamExpertiseStatsList';

import BadgeFilterHeader from './BadgeFilterHeader';
import KamLevelScoreCard from './KamLevelScoreCard';
import KamOverview from './KamOverview';
import LeaderboardList from './LeaderboardList';
import styles from './styles.module.css';

function KamData(props) {
	const { date_params = {} } = props;

	const {
		loading = false,
		dashboardData,
		kamLevel,
		setKamLevel,
	} = useGetKamExpertiseDashboard(date_params);

	const {
		setOverviewParams = () => {},
		overviewLoading = false,
		overviewList = [],
	} = useGetKamExpertiseLevelOverview();

	const {
		setListParams = () => {},
		leaderboardLoading = false,
		leaderboardList = [],
		searchKAM = '',
		setSearchKAM = () => {},
		badgeName = '',
		setBadgeName = () => {},
		debounceQuery,
		paginationData,
		getNextPage,
	} = useGetKamExpertiseStatsList();

	const { list } = dashboardData || {};

	if (loading) {
		return (
			<div className={styles.cards}>
				{[1, 2, 3, 4].map((item) => (
					<KamLevelScoreCard key={item} loading={loading} />
				))}
			</div>

		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.empty_kam}>
				<EmptyState
					height={220}
					width={380}
					flexDirection="column"
					textSize={20}
				/>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.cards}>
				{
					list.map((listData, index_lvl) => (
						<KamLevelScoreCard
							index_lvl={index_lvl}
							listData={listData}
							setKamLevel={setKamLevel}
							date_params={date_params}
							setListParams={setListParams}
							setOverviewParams={setOverviewParams}
						/>
					))
				}
			</div>

			{
				isEmpty(kamLevel) && (
					<div className={styles.level_zero}>
						Click on KAM level card to view leaderboard overview
					</div>
				)
			}

			{kamLevel && (
				<>
					<div className={styles.container}>
						<div className={styles.header}>
							{`KAM ${kamLevel} Overview`}
						</div>

						<KamOverview
							overviewList={overviewList}
							overviewLoading={overviewLoading}
						/>
					</div>

					<div className={styles.leaderboard_container}>
						<BadgeFilterHeader
							leaderboardLoading={leaderboardLoading}
							searchKAM={searchKAM}
							setSearchKAM={setSearchKAM}
							debounceQuery={debounceQuery}
							badgeName={badgeName}
							setBadgeName={setBadgeName}
						/>

						<LeaderboardList
							leaderboardLoading={leaderboardLoading}
							leaderboardList={leaderboardList}
							paginationData={paginationData}
							getNextPage={getNextPage}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default KamData;
