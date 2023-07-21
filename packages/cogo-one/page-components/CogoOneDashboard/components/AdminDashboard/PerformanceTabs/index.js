import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import useListOmniChannelAgentRanking from '../../../hooks/useListOmnichannelAgentRankings';

import LoaderPerformance from './LoaderPerformance';
import styles from './styles.module.css';

const INCREASE_RANKING = 1;

function PerformanceTab() {
	const { data, loading } = useListOmniChannelAgentRanking();
	const { list = [] } = data || {};

	if (loading) {
		return (
			<div className={styles.loading_container}>
				<LoaderPerformance />
			</div>
		);
	}

	return (
		<div className={styles.main_box}>
			<div className={styles.performance_tab_container}>
				<div className={styles.heading}>Leaderboard</div>
				{!isEmpty(list) ? (
					<div className={styles.list_container}>
						{(list || []).map((item, index) => {
							const { agent_data = {}, id = '' } = item || {};
							const { name = '', email = '' } = agent_data || {};

							return (
								<div className={styles.performance_list} key={id}>
									<div className={styles.rank}>{index + INCREASE_RANKING}</div>
									<div className={styles.picture_name_kam_box}>
										<div className={styles.agent_picture}>
											<Image
												src={GLOBAL_CONSTANTS.image_url.agent_avatar_icon}
												alt="Agent Avatar"
												width={25}
												height={25}
											/>
										</div>
										<div className={styles.details}>
											<div className={styles.agent_name}>{startCase(name) || 'gerger'}</div>
											<div className={styles.email_content}>{email || 'fdgdfjkgndf'}</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_chart}
						alt="Empty Performance"
						width={150}
						height={150}
						className={styles.empty_performance_picture}
					/>
				) }
			</div>
		</div>
	);
}

export default PerformanceTab;
