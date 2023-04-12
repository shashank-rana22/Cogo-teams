/* eslint-disable max-len */
import { Placeholder, cl } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import React, { useEffect } from 'react';

import chartData from '../../../configurations/chart-data';
import { imgURL } from '../../../constants/image-urls';
import useGetUsersStats from '../../../hooks/useGetUsersStats';

import LeaderBoard from './LeaderBoard';
import Charts from './LineChart';
import PrimaryStats from './PrimaryStats';
import styles from './styles.module.css';

function Stats(props = {}) {
	const { userStats = {}, getUserSats, firebaseLoading = false } = useGetUsersStats();
	const {
		chatLoading = false,
		platFormChatData = {},
	} = props || {};

	const {
		token,
	} = useSelector(({ general }) => ({
		token: general.firestoreToken || '',
	}));

	useEffect(() => {
		const auth = getAuth();
		signInWithCustomToken(auth, token)
			.catch((error) => {
				console.log('firestore_auth_error:', error.message);
			});
		getUserSats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { bot_data = {}, customer_support_data = {} } = platFormChatData || {};
	const GraphData = chartData({ platFormChatData }) || [];
	const hideChart = isEmpty(bot_data) && isEmpty(customer_support_data);

	return (
		<div className={styles.main_container}>

			<div className={styles.cogoverse_header}>

				<img src={imgURL.cogoverse_animated_icon} style={{ marginLeft: '10px' }} alt="Cogoverse Icon" width="18px" />
				<div className={cl`${styles.cogoverse}`}>ogoVerse Analytics</div>
			</div>

			<PrimaryStats userStats={userStats} firebaseLoading={firebaseLoading} />

			<div className={styles.line_chart_container}>
				<div className={styles.chart_heading}>
					<div className={styles.chart_heading_content}>Responsive Time Analysis</div>
					{
						!chatLoading && !hideChart && (
							<div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_1} />
									<div className={styles.legend_content}>CogoAssist</div>
								</div>
								<div className={styles.legend_field}>
									<div className={styles.legend_icon_2} />
									<div className={styles.legend_content}>Customer support</div>
								</div>
							</div>
						)
					}

				</div>
				<div className={styles.the_chart}>
					{
						!chatLoading ? <Charts GraphData={GraphData} hideChart={hideChart} />
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
