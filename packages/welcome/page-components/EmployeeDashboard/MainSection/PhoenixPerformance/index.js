import { Select } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import Feed from '../Feed';

import CompanyLeaderBoard from './CompanyLeaderBoard';
import IndividualActivity from './IndividualActivity';
import styles from './styles.module.css';
import TeamLeaderBoard from './TeamLeaderBoard';
import ThingsToDo from './ThingsToDo';
// import WorkingHrs from './WorkingHrs';

// https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rectangle_126.svg
const OPTIONS = [
	{ label: 'March 2023', value: 'march' },
];

function PhoenixPerformance({ data = {} }) {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div>
						<div className={styles.title}>PHONEIX PERFORMANCE</div>
						<div className={styles.sub_title}>View how your team is doing</div>
					</div>
					<div className={styles.performance_achievement}>
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
						<Select options={OPTIONS} value={OPTIONS.label} />
					</div>
				</div>
				<div className={styles.kpi_flex}>
					<div className={styles.kpi_data}>
						<div className={styles.kpi_okr}>
							<div className={styles.kpi_okr_title}>Team Rating</div>
							<div className={styles.kpi_okr_count}>3.2</div>
							<div className={styles.view_okr_flex}>
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
						<div className={styles.happiness_index}>
							<div className={styles.kpi_okr_title}>Team Happiness Index</div>
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
							</div>
						</div>
					</div>
				</div>
				<div className={styles.leaderboard_container}>
					<div className={styles.leaderboard_data}>
						<div className={styles.leaderboard}>
							<TeamLeaderBoard />
						</div>
					</div>
					<div className={styles.leaderboard_data}>
						<div className={styles.leaderboard}>
							<IndividualActivity />
						</div>
					</div>

				</div>

				<div className={styles.leaderboard_container}>
					<div className={styles.leaderboard_data}>
						<div className={styles.leaderboard}>
							<ThingsToDo />
						</div>
					</div>
					<div className={styles.leaderboard_data}>
						<div className={styles.leaderboard}>
							<CompanyLeaderBoard />
						</div>
					</div>
				</div>
			</div>

			<div className={styles.company_feed}>
				<div className={styles.company_feed_title}>Company Feed</div>
				<div className={styles.sub_title}>Updates, announcements and more</div>
				<Feed data={data} />
			</div>
		</>
	);
}

export default PhoenixPerformance;
