import { IcMAgentManagement, IcMTradeparties, IcMBreakBulkCargoType, IcMMiscellaneous } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import useGetKamExpertiseDashboard from '../../../hooks/useGetKamExpertiseDashboard';
import useGetKamExpertiseStatsList from '../../../hooks/useGetKamExpertiseStatsList';

import BadgeFilterHeader from './BadgeFilterHeader';
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

function KamData(props) {
	const { date_params = {} } = props;
	const [kamLevel, setKamLevel] = useState();

	const {
		loading = false,
		dashboardData = [],
	} = useGetKamExpertiseDashboard(date_params);

	const {
		setParams = () => {},
		leaderboardLoading = false,
		leaderboardList = [],
		// listRefetch = () => {},
		searchKAM,
		setSearchKAM,
		badgeName,
		setBadgeName,
		debounceQuery,
		paginationData,
		getNextPage,
	} = useGetKamExpertiseStatsList();

	useEffect(() => {
		setKamLevel();
	}, [date_params]);

	const { list = [] } = dashboardData || {};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.cards}>
					{
							Array(4).fill('').map(() => (
								<KamLevelScoreCard loading={loading} />
							))
						}
				</div>
			</div>
		);
	}

	if (isEmpty(list)) {
		return (
			<div className={styles.container}>
				<div className={styles.empty_kam}>
					<EmptyState
						height={250}
						width={450}
						flexDirection="column"
						textSize={20}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			<div className={styles.cards}>
				{
					list.map((list_data, index_lvl) => (
						<KamLevelScoreCard
							index_lvl={index_lvl}
							list_data={list_data}
							setKamLevel={setKamLevel}
							date_params={date_params}
							setParams={setParams}
						/>
					))
				}
			</div>

			{kamLevel && (
				<>
					<div className={styles.overview_container}>
						<div className={styles.overview_header}>
							{`KAM ${kamLevel} Overview`}
						</div>

						<div className={styles.overview_cards}>
							{/* //!using dummy data for now */}
							{
								overview_data.map((data) => (
									<OverviewCard data={data} leaderboardLoading={leaderboardLoading} />
								))
							}
						</div>
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
