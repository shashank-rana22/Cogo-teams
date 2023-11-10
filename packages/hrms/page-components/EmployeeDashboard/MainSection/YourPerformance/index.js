import { cl, Toggle } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';
import React from 'react';

import CompanyPerformance from '../CompanyPerformance';
import Feed from '../Feed';
import TeamPerformance from '../TeamPerformance';

import Leaderboard from './Leaderboard';
import styles from './styles.module.css';
import WorkingHrs from './WorkingHrs';

function YourPerformance({
	data, feedRefetch, setFilters, summaryData, isEmployeeDashboardActive,
	setIsEmployeeDashboardActive, feedLoading,
}) {
	const { graph_detail, clap_recieved, rating_list, user_role, rating_chart_details } = summaryData || {};

	const { self_rating, rating_month } = rating_list || {};

	return (
		<>
			{(user_role === 'employee' || isEmployeeDashboardActive === false) && (
				<div className={styles.container}>
					<div className={styles.flex}>
						<div>
							<div className={styles.title}>Your Performance</div>
							<div className={styles.sub_title}>You are valuable to us 🙌</div>
						</div>
						<div className={styles.performance_achievement}>
							{user_role !== 'employee' && (
								<Toggle
									name="a1"
									size="sm"
									checked={isEmployeeDashboardActive}
									onChange={(e) => setIsEmployeeDashboardActive(e.target.checked)}
									onLabel="Company"
									offLabel="Employee"
								/>
							)}
							<div className={cl`${styles.claps_flex} ${styles.mr_12}`}>
								<div className={styles.claps}>👏</div>
								{clap_recieved}
								{' '}
								Claps Received
							</div>
						</div>
					</div>
					<div className={styles.kpi_flex}>
						<div className={styles.kpi_data}>
							<div className={styles.kpi_okr}>
								<div className={styles.kpi_okr_title}>
									{`${startCase(rating_month)}`}
									{' '}
									KPI
								</div>
								<div className={styles.kpi_okr_count}>{self_rating}</div>
								<div className={styles.view_okr_flex} />
								<div className={styles.kpi_img}>
									<img
										alt="kpi-img"
										src={GLOBAL_CONSTANTS.image_url.kpi}
									/>
								</div>
							</div>
						</div>
						<div className={styles.story_points_data}>
							<WorkingHrs title="Performance Analysis" graph_detail={rating_chart_details} />
						</div>
					</div>
					<div className={styles.leaderboard_data}>
						<div className={styles.leaderboard}>
							<Leaderboard rating_list={rating_list?.rating_list} />
						</div>
						<div className={styles.working_hrs}>
							<WorkingHrs title="Working Hours" graph_detail={graph_detail} />
						</div>
					</div>
				</div>
			)}
			{user_role === 'hrbp' && isEmployeeDashboardActive && (
				<CompanyPerformance
					data={data}
					feedRefetch={feedRefetch}
					setFilters={setFilters}
					summaryData={summaryData}
					isEmployeeDashboardActive={isEmployeeDashboardActive}
					setIsEmployeeDashboardActive={setIsEmployeeDashboardActive}
				/>
			)}
			{user_role === 'manager' && isEmployeeDashboardActive && (
				<TeamPerformance
					data={summaryData}
					isEmployeeDashboardActive={isEmployeeDashboardActive}
					setIsEmployeeDashboardActive={setIsEmployeeDashboardActive}
				/>
			)}
			<div className={styles.company_feed}>
				<div className={styles.company_feed_title}>Company Feed</div>
				<div className={styles.sub_title}>Updates, announcements and more</div>
				<Feed
					data={data}
					feedRefetch={feedRefetch}
					setFilters={setFilters}
					summaryData={summaryData}
					feedLoading={feedLoading}
				/>
			</div>
		</>
	);
}

export default YourPerformance;
