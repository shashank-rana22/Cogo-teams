import { cl } from '@cogoport/components';
// import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import CompanyPerformance from '../CompanyPerformance';
import Feed from '../Feed';
import TeamPerformance from '../TeamPerformance';

import Leaderboard from './Leaderboard';
import StoryPoints from './StoryPoints';
import styles from './styles.module.css';
import WorkingHrs from './WorkingHrs';

function YourPerformance({ data, feedRefetch, setFilters, summaryData }) {
	console.log('summaryData', summaryData);

	const { graph_detail, clap_recieved, rating_list } = summaryData || {};

	const { self_rating } = rating_list || {};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.flex}>
					<div>
						<div className={styles.title}>Your Performance</div>
						<div className={styles.sub_title}>You are valuable to us 🙌</div>
					</div>
					<div className={styles.performance_achievement}>
						<div className={cl`${styles.claps_flex} ${styles.mr_12}`}>
							<div className={styles.claps}>👏</div>
							{clap_recieved}
							{' '}
							Claps Recieved
						</div>
					</div>
				</div>
				<div className={styles.kpi_flex}>
					<div className={styles.kpi_data}>
						<div className={styles.kpi_okr}>
							<div className={styles.kpi_okr_title}>October KPI</div>
							<div className={styles.kpi_okr_count}>{self_rating}</div>
							<div className={styles.view_okr_flex}>
								{/* View your oKR’s
								{' '}
								<IcMArrowRight
									width={12}
									height={12}
									style={{ marginLeft: 2 }}
								/> */}
							</div>
							<div className={styles.kpi_img}>
								<img
									alt="kpi-img"
									src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/Rectangle_126.svg"
								/>
							</div>
						</div>
					</div>
					<div className={styles.story_points_data}>
						<StoryPoints />
					</div>
				</div>
				<div className={styles.leaderboard_data}>
					<div className={styles.leaderboard}>
						<Leaderboard rating_list={rating_list?.rating_list} />
					</div>
					<div className={styles.working_hrs}>
						<WorkingHrs graph_detail={graph_detail} />
					</div>
				</div>
			</div>
			<CompanyPerformance
				data={data}
				feedRefetch={feedRefetch}
				setFilters={setFilters}
				summaryData={summaryData}
			/>
			<TeamPerformance />
			<div className={styles.company_feed}>
				<div className={styles.company_feed_title}>Company Feed</div>
				<div className={styles.sub_title}>Updates, announcements and more</div>
				<Feed data={data} feedRefetch={feedRefetch} setFilters={setFilters} summaryData={summaryData} />
			</div>
		</>
	);
}

export default YourPerformance;
