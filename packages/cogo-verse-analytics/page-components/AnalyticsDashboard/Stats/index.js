import { cl, Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { imgURL } from '../../../constants/image-urls';
import useGetUsersStats from '../../../hooks/useGetUsersStats';

import LeaderBoard from './LeaderBoard';
import Charts from './LineChart';
import PrimaryStats from './PrimaryStats';
import styles from './styles.module.css';

function Stats(props = {}) {
	const { userStats = {}, getUserSats, firebaseLoading = false } = useGetUsersStats();

	useEffect(() => {
		getUserSats();
	}, [getUserSats]);

	const {
		statsLoading,
		stats = {},
	} = props || {};

	const hideChart = isEmpty(stats);
	const statsData = stats?.list || {};
	const graph = statsData?.weekly_shipments || [];

	return (
		<div className={styles.main_container}>

			<div className={styles.cogoverse_header}>

				<img
					src={imgURL.cogoverse_animated_icon}
					style={{ marginLeft: '10px' }}
					alt="Cogoverse Icon"
					width="18px"
				/>
				<div className={cl`${styles.cogoverse}`}>ogoVerse Analytics</div>
			</div>

			<PrimaryStats
				userStats={userStats}
				stats={stats}
				firebaseLoading={firebaseLoading}
				statsLoading={statsLoading}
			/>

			<div className={styles.line_chart_container}>
				<div className={styles.chart_heading}>
					<div className={styles.chart_heading_content}>
						<span>Week on Week Shipments</span>
					</div>
					{
						(!statsLoading && (
							<div className={styles.legend}>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_1} />
									<div className={styles.legend_content}>Cancelled Shipments</div>
								</div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_2} />
									<div className={styles.legend_content}>Active Shipments</div>
								</div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_3} />
									<div className={styles.legend_content}>Total Shipments</div>
								</div>
							</div>
						))
					}

				</div>
				<div className={styles.the_chart}>
					{
						!statsLoading ? <Charts GraphData={graph} hideChart={hideChart} />
							: (
								<div className={styles.chart_empty}>
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />
									<Placeholder height="1px" margin="10px 0px" />

									<object
										data={imgURL.empty_bot}
										type="image/svg+xml"
										aria-label="Loading Chart..."
										className={styles.empty_bot_svg}
									/>
								</div>
							)
					}

				</div>

			</div>

			<LeaderBoard {...props} />

		</div>
	);
}

export default Stats;
