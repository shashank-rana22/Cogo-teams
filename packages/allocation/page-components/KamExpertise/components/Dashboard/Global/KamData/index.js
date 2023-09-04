import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import EmptyState from '../../../../../../common/EmptyState';
import useGetKamExpertiseDashboard from '../../../../hooks/useGetKamExpertiseDashboard';
import useGetKamExpertiseLevelOverview from '../../../../hooks/useGetKamExpertiseLevelOverview';
import useGetKamExpertiseStatsList from '../../../../hooks/useGetKamExpertiseStatsList';

import BadgeFilterHeader from './BadgeFilterHeader';
import KamLevelScoreCard from './KamLevelScoreCard';
import KamOverview from './KamOverview';
import LeaderboardList from './LeaderboardList';
import styles from './styles.module.css';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const FOUR = 4;

function KamData() {
	const { t } = useTranslation(['allocation']);

	const {
		loading = false,
		dashboardData,
		kamLevel,
		setKamLevel,
	} = useGetKamExpertiseDashboard();

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
		conditionName = '',
		setConditionName = () => {},
		roleName = '',
		setRoleName = () => {},
		managerName = '',
		setManagerName = () => {},
		debounceQuery,
		paginationData,
		getNextPage,
	} = useGetKamExpertiseStatsList();

	const { list } = dashboardData || {};
	if (loading) {
		return (
			<div className={styles.cards}>
				{[ONE, TWO, THREE, FOUR].map((item) => (
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
							key={listData.id}
							index_lvl={index_lvl}
							listData={listData}
							setKamLevel={setKamLevel}
							setListParams={setListParams}
							setOverviewParams={setOverviewParams}
						/>
					))
				}
			</div>
			{
				isEmpty(kamLevel) && (
					<div className={styles.level_zero}>
						{t('allocation:level_card_to_view_leaderboard_overview')}
					</div>
				)
			}

			{kamLevel && (
				<>
					<div className={styles.container}>
						<div className={styles.header}>
							{`${t('allocation:kam')} ${kamLevel} ${t('allocation:overview_label')}`}
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
							conditionName={conditionName}
							setConditionName={setConditionName}
							roleName={roleName}
							setRoleName={setRoleName}
							managerName={managerName}
							setManagerName={setManagerName}
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
