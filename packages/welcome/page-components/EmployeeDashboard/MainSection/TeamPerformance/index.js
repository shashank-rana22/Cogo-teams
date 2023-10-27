// import { Select } from '@cogoport/components';
import { Toggle } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React from 'react';

// import CompanyLeaderBoard from './CompanyLeaderBoard';
import IndividualActivity from './IndividualActivity';
import styles from './styles.module.css';
import TeamLeaderBoard from './TeamLeaderBoard';
import ThingsToDo from './ThingsToDo';
// import WorkingHrs from './WorkingHrs';

// https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rectangle_126.svg
// const OPTIONS = [
// 	{ label: 'March 2023', value: 'march' },
// ];

function TeamPerformance({ data = {}, setIsEmployeeDashboardActive, isEmployeeDashboardActive }) {
	const { rating_list } = data || {};
	const { avg_rating } = rating_list || {};
	const { push } = useRouter();
	console.log('🚀 ~ file: index.js:19 ~ TeamPerformance ~ data:', data);
	return (
		<div className={styles.container}>
			<div className={styles.flex}>
				<div>
					<div className={styles.title}>TEAM PERFORMANCE</div>
					<div className={styles.sub_title}>View how your team is doing</div>
				</div>
				<div className={styles.performance_achievement}>
					<Toggle
						name="a1"
						size="sm"
						checked={isEmployeeDashboardActive}
						onChange={(e) => setIsEmployeeDashboardActive(e.target.checked)}
						onLabel="Company"
						offLabel="Employee"
					/>
					{/* <div className={cl`${styles.claps_flex} ${styles.mr_12}`}>
							<div className={styles.claps}>👏</div>
							32 Claps Recieved
						</div>
						<div className={styles.claps_flex}>
							<div className={styles.claps}>
								<IcCStarfull width={16} height={16} />
							</div>
							Believer
						</div> */}
					{/* <Select options={OPTIONS} value={OPTIONS.label} /> */}
				</div>
			</div>
			<div className={styles.kpi_flex}>
				<div className={styles.kpi_data}>
					<div className={styles.kpi_okr}>
						<div className={styles.kpi_okr_title}>Team Rating</div>
						<div className={styles.kpi_okr_count}>{(avg_rating || 0)?.toFixed(2) || 0}</div>
						<div
							className={styles.view_okr_flex}
							onClick={() => push('/performance-management/rating-review')}
							aria-hidden
							style={{ cursor: 'pointer' }}
						>
							View Team KPI
							{' '}
							<IcMArrowRight
								width={12}
								height={12}
								style={{ marginLeft: 2 }}
							/>
						</div>
						<div className={styles.kpi_img}>
							<img
								alt="kpi-img"
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rocket.png"
							/>
						</div>
					</div>
				</div>

				<div className={styles.kpi_data}>
					{/* <div className={styles.happiness_index}> */}
					<IndividualActivity data={data} />
					{/* <div className={styles.kpi_okr_title}>Team Happiness Index</div>
						<div className={styles.kpi_okr_count}>Happy</div>
						<div className={styles.view_okr_flex}>
							View details
							{' '}
							<IcMArrowRight
								width={12}
								height={12}
								style={{ marginLeft: 2 }}
							/>
						</div>
						<div className={styles.kpi_img_2}>
							<img
								alt="kpi-img"
								src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Face.svg"
							/>
						</div> */}
					{/* </div> */}
				</div>
			</div>
			<div className={styles.leaderboard_container}>
				<div className={styles.leaderboard_data}>
					<div className={styles.leaderboard}>
						<TeamLeaderBoard data={data} />
					</div>
				</div>
				<div className={styles.leaderboard_data}>
					<div className={styles.leaderboard}>
						{/* <IndividualActivity data={data} /> */}
						<ThingsToDo data={data} />
					</div>
				</div>
			</div>

			{/* <div className={styles.leaderboard_container}>
				<div className={styles.leaderboard_data}>
					<div className={styles.leaderboard}>
						<ThingsToDo data={data} />
					</div>
				</div>
				<div className={styles.leaderboard_data}>
					<div className={styles.leaderboard}>
						<CompanyLeaderBoard />
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default TeamPerformance;
