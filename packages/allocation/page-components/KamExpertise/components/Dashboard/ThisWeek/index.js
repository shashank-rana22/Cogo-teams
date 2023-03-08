import { Placeholder, Card, Tooltip } from '@cogoport/components';
import {
	IcMArrowNext,
	IcMInfo, IcMAgentManagement, IcMTradeparties, IcMBreakBulkCargoType, IcMMiscellaneous,
} from '@cogoport/icons-react';
import React, { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import useGetAllocationKamExpertiseStats from '../../../hooks/useGetAllocationKamExpertiseStats';
import BadgeFilter from '../BadgeFilter';

import CardContent from './CardContent';
import LeaderboardList from './LeaderboardList';
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
	const { loading, kam_level_data, refetch } = useGetAllocationKamExpertiseStats();
	// const [visible, setVisible] = useState(false);

	console.log('kam_level_data', kam_level_data);

	return (
		<div className={styles.container}>
			<div className={styles.cards}>
				{
					dummy_card_data.map((dummy_data) => (
						// ! loading state logic below

						false ? (
							<Card
								key={dummy_data.title}
								className={styles.card_item}
							>
								<Card.Title title={(
									<div className={styles.card_title}>
										<Placeholder width="60px" height="20px" />
									</div>
								)}
								/>
								<Card.Description className={styles.card_content}>
									<Placeholder width="100px" height="60px" style={{ marginTop: '16px' }} />
									<Placeholder width="100px" height="60px" style={{ marginTop: '16px' }} />
								</Card.Description>
							</Card>
						) : (
						// <div
						// 	key={dummy_data.title}
						// 	role="presentation"
						// 	className={styles.card_container}
						// 	// onClick={() => setCardData(dummy_data)}
						// >
							<Card
								themetype="primary"
								disabled={false}
								className={styles.card_item}
								onClick={() => setCardData(dummy_data)}
							>
								<Card.Title title={(
									<div className={styles.card_title}>
										<h3>{dummy_data.title}</h3>
										<IcMArrowNext width={28} height={28} style={{ color: 'red' }} />
									</div>
								)}
								/>
								<Card.Description className={styles.card_content}>
									<CardContent dummy_data={dummy_data} value="count" />
									<CardContent dummy_data={dummy_data} value="avg_score" />
								</Card.Description>
							</Card>
						// </div>
						)

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

								// ! loading state logic
								false ? (
									<Card
										key={data.title}
										themetype="primary"
										disabled={false}
										className={styles.inner_card_item}
									>
										<Card.Title title={(
											<div className={styles.overview_card_title}>
												<Placeholder width="200px" height="24px" />
											</div>
										)}
										/>
										<Card.Description className={styles.overview_card_content}>
											<div style={{
												display       : 'flex',
												flexDirection : 'column',
												paddingTop    : '20px',
											}}
											>
												<Placeholder width="60px" />
												<Placeholder style={{ marginTop: '8px' }} width="60px" />
											</div>
											<div style={{
												display       : 'flex',
												flexDirection : 'column',
												paddingTop    : '20px',
											}}
											>
												<Placeholder width="60px" />
												<Placeholder style={{ marginTop: '8px' }} width="60px" />
											</div>
										</Card.Description>
									</Card>
								) : (
									<Card
										key={data.title}
										themetype="primary"
										disabled={false}
										className={styles.inner_card_item}
									>
										<Card.Title title={(
											<div className={styles.overview_card_title}>
												<span>{data.icon}</span>
												<span style={{ padding: '0 10px' }}><h3>{data.title}</h3></span>
												<span style={{ paddingTop: '4px', width: '40px', height: '40px' }}>
													<Tooltip
														content={data.title}
														placement="top"
													>
														<IcMInfo
															width={16}
															height={16}
														/>
													</Tooltip>
												</span>
											</div>
										)}
										/>
										<Card.Description className={styles.overview_card_content}>
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<span
													style={{
														fontSize: '12px',
													}}
												>
													Avg Score
												</span>
												<span style={{ display: 'flex', fontWeight: 'bold' }}>
													{data.avg_score}
												</span>
											</div>
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<span
													style={{
														fontSize: '12px',
													}}
												>
													Most Points in
												</span>
												<span style={{ display: 'flex', fontWeight: 'bold' }}>
													{data.points_in}
												</span>
											</div>
										</Card.Description>
									</Card>
								)
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
									false ? (
										<div style={{
											padding         : '80px 0',
											height          : '400px',
											backgroundColor : 'white',
											margin          : '20px 0',
											// display : 'flex',
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
