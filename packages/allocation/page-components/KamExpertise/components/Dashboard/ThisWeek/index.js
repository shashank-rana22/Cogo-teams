import { IcMAgentManagement, IcMTradeparties, IcMBreakBulkCargoType, IcMMiscellaneous } from '@cogoport/icons-react';
import React, { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import useGetAllocationKamExpertiseStats from '../../../hooks/useGetAllocationKamExpertiseStats';
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

function ThisWeek() {
	const [cardData, setCardData] = useState();
	// const { loading, kam_level_data, refetch } = useGetAllocationKamExpertiseStats();
	// const [visible, setVisible] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.cards}>
				{
					dummy_card_data.map((dummy_data) => (
						//! pass loading
						<KamLevelScoreCard dummy_data={dummy_data} setCardData={setCardData} />
					))
				}
			</div>
			{cardData && (
				<>
					<div className={styles.overview_container}>
						<div className={styles.overview_header}>
							{`${cardData.title} Overview`}
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
							// Todo: add isEmpty and !loading condition for emptyState
							false
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

export default ThisWeek;
