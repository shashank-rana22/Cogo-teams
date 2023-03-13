import { IcMAgentManagement, IcMTradeparties, IcMBreakBulkCargoType, IcMMiscellaneous } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import useGetKamExpertiseDashboard from '../../../hooks/useGetKamExpertiseDashboard';
import BadgeFilter from '../BadgeFilter';

import KamLevelScoreCard from './KamLevelScoreCard';
import LeaderboardList from './LeaderboardList';
import OverviewCard from './OverviewCard';
import styles from './styles.module.css';

const dummy_card_data = [
	{
		title             : 'KAM 1',
		count             : 28,
		avg_score         : 2300,
		percentage_change : 1.01,
		has_increased     : false,
	},
	{
		title             : 'KAM 2',
		count             : 19,
		avg_score         : 1200,
		percentage_change : 1.01,
		has_increased     : true,
	},
	{
		title             : 'KAM 3',
		count             : 34,
		avg_score         : 1700,
		percentage_change : 1.01,
		has_increased     : true,
	},
	{
		title             : 'KAM 4',
		count             : 29,
		avg_score         : 3100,
		percentage_change : 1.01,
		has_increased     : true,
	},
];

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
		dashboardData,
	} = useGetKamExpertiseDashboard(params);

	const { list = [] } = dashboardData || {};

	useEffect(() => {
		setKamLevel();
	}, [params]);

	return (
		<div className={styles.container}>
			{ !isEmpty(list)
				? (
					<div className={styles.cards}>
						{
					// dummy_card_data
					list.map((list_data, index_lvl) => (
						<KamLevelScoreCard
							index_lvl={index_lvl}
							list_data={list_data}
							loading={loading}
							setKamLevel={setKamLevel}
						/>
					))
				}
					</div>
				)
				: (
					<div className={styles.empty_list}>
						<EmptyState
							height={250}
							width={450}
							flexDirection="column"
							textSize={20}
						/>
					</div>
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
								<BadgeFilter />
							</div>
						</div>
						{
							// isEmpty(dashboardData.list)
							(false)
								? (
									<div style={{
										padding         : '80px 0',
										height          : '400px',
										backgroundColor : 'white',
										margin          : '20px 0',
									}}
									>
										<EmptyState height={300} width={400} flexDirection="column" />
									</div>
								)
								: (
									<div className={styles.list}>
										<LeaderboardList />
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
