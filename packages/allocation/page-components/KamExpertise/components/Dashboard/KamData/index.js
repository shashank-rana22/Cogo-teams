import { IcMAgentManagement, IcMTradeparties, IcMBreakBulkCargoType, IcMMiscellaneous } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import useGetKamExpertiseDashboard from '../../../hooks/useGetKamExpertiseDashboard';
import useGetKamExpertiseStatsList from '../../../hooks/useGetKamExpertiseStatsList';
import BadgeFilter from '../BadgeFilter';

import KamLevelScoreCard from './KamLevelScoreCard';
import LeaderboardList from './LeaderboardList';
import OverviewCard from './OverviewCard';
import styles from './styles.module.css';

const overview_data = [
	{
		title     : 'Customer Expertise',
		avg_score : 2300,
		points_in : 'Re-activation',
		icon      : <IcMAgentManagement height={24} width={24} />,
	},
	{
		title     : 'Trade Expertise',
		avg_score : 2300,
		points_in : 'Re-activation',
		icon      : <IcMTradeparties height={24} width={24} />,
	},
	{
		title     : 'Commodity Expertise',
		avg_score : 2300,
		points_in : 'Re-activation',
		icon      : <IcMBreakBulkCargoType height={24} width={24} />,
	},
	{
		title     : 'Misc  Expertise',
		avg_score : 2300,
		points_in : 'Re-activation',
		icon      : <IcMMiscellaneous height={24} width={24} />,
	},
];

function KamData({ params }) {
	const [kamLevel, setKamLevel] = useState();
	const {
		loading = false,
		dashboardData = [],
	} = useGetKamExpertiseDashboard(params);

	const {
		leaderboardLoading,
		leaderboardList,
		listRefetch,
		searchKAM,
		setSearchKAM,
		setBadgeName,
		debounceQuery,
		paginationData,
		getNextPage,
	} = useGetKamExpertiseStatsList();

	const { list = [] } = dashboardData || {};

	useEffect(() => {
		setKamLevel();
	}, [params]);

	return (
		<div className={styles.container}>
			{
				loading
				&& (
					<div className={styles.cards}>
						{
							Array(4).fill('').map(() => (
								<KamLevelScoreCard loading={loading} />
							))
						}
					</div>
				)
			}
			{ !isEmpty(list) && !loading
				? (
					<div className={styles.cards}>
						{
							list.map((list_data, index_lvl) => (
								<KamLevelScoreCard
									index_lvl={index_lvl}
									list_data={list_data}
									setKamLevel={setKamLevel}
								/>
							))
						}
					</div>
				)
				: (!loading
					&& (
						<div className={styles.empty_kam}>
							<EmptyState
								height={250}
								width={450}
								flexDirection="column"
								textSize={20}
							/>
						</div>
					)
				)}

			{kamLevel && (
				<>
					<div className={styles.overview_container}>
						<div className={styles.overview_header}>
							{`KAM ${kamLevel} Overview`}
						</div>
						<div className={styles.overview_cards}>
							{
								overview_data.map((data) => (
									<OverviewCard data={data} />
								))
							}
						</div>
					</div>
					<div className={styles.leaderboard_container}>
						<div className={styles.leaderboard_header}>
							<div className={styles.overview_header}>
								Leaderboard
							</div>
							<div className={styles.filters}>
								<BadgeFilter
									searchKAM={searchKAM}
									setSearchKAM={setSearchKAM}
									debounceQuery={debounceQuery}
								/>
							</div>
						</div>
						{
							// isEmpty(dashboardData.list)
							(false)
								? (
									<div className={styles.empty_leaderboard}>
										<EmptyState height={300} width={400} flexDirection="column" />
									</div>
								)
								: (
									<div className={styles.list}>
										<LeaderboardList
											leaderboardLoading={leaderboardLoading}
											leaderboardList={leaderboardList}
											paginationData={paginationData}
											getNextPage={getNextPage}
										/>
									</div>
								)
						}

					</div>
				</>
			)}
		</div>
	);
}

export default KamData;
